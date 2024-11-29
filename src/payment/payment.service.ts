import { AppDataSource } from "../data-source";
import { DoctorWallet } from "../entity/doctor-wallet.entity";
import { PatientWallet } from "../entity/patient-wallet.entity";
import { Appointment } from "../entity/appointment.entity";
import { EntityManager } from "typeorm";
import { Transaction } from "../entity/transaction.entity";
import { TransactionDto } from "./dto/transaction.dto";

export class PaymentService {
  constructor(
    private transactionRepo = AppDataSource.getRepository(Transaction)
  ) {}

  async transaction(
    data: TransactionDto,
    patientId: number
  ): Promise<Transaction> {
    return await AppDataSource.transaction(
      async (entityManager: EntityManager) => {
        try {
          const patientWallet = await entityManager.findOne(PatientWallet, {
            where: { patientId: patientId },
          });
          const doctorWallet = await entityManager.findOne(DoctorWallet, {
            where: { doctorId: data.doctorId },
          });
          const appointment = await entityManager.findOne(Appointment, {
            where: { id: data.appointmentId },
          });

          if (!patientWallet) throw new Error("Patient wallet not found");
          if (!doctorWallet) throw new Error("Doctor wallet not found");
          if (!appointment) throw new Error("Appointment not found");

          if (patientWallet.balance < appointment.price)
            throw new Error("Insufficient balance in patient wallet");
          if (appointment.status === "confirmed")
            throw new Error("This appointment is not available");

          // Update balances
          patientWallet.balance -= appointment.price;
          doctorWallet.balance += appointment.price;

          await entityManager.save(patientWallet);
          await entityManager.save(doctorWallet);

          const patientTransaction = entityManager.create(Transaction, {
            patientId: patientId,
            doctorId: data.doctorId,
            balanceChange: -appointment.price,
            type: "patient_payment",
          });
          await entityManager.save(patientTransaction);

          const drTransaction = entityManager.create(Transaction, {
            patientId: patientId,
            doctorId: data.doctorId,
            balanceChange: appointment.price,
            type: "doctor_payment_received",
          });
          await entityManager.save(drTransaction);

          // Update appointment status
          appointment.status = "confirmed";
          await entityManager.save(appointment);

          return patientTransaction;
        } catch (error) {
          console.error("Transaction failed: ", error);
          throw new Error(
            "Payment process failed. Changes have been rolled back."
          );
        }
      }
    );
  }

  async getTransactionHistory(
    walletType: "patient" | "doctor",
    patientId?: number,
    doctorId?: number
  ): Promise<Transaction[]> {
    if (walletType === "patient") {
      if (!patientId)
        throw new Error("Patient ID is required for patient wallet type.");

      // Retrieve patient wallet history
      const patientTransactions = await this.transactionRepo.find({
        where: { patientId: patientId, type: "patient_payment" },
        order: { timestamp: "DESC" }, // Order by most recent history first
      });
      return patientTransactions;
    } else if (walletType === "doctor") {
      if (!doctorId)
        throw new Error("Doctor ID is required for doctor wallet type.");

      // Retrieve doctor wallet history
      const doctorHistory = await this.transactionRepo.find({
        where: { doctorId: doctorId, type: "doctor_payment_received" },
        order: { timestamp: "DESC" }, // Order by most recent history first
      });
      return doctorHistory;
    } else {
      throw new Error("Invalid wallet type specified");
    }
  }
}
