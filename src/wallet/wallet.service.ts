import { EntityManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { DoctorWallet } from "../entity/doctor-wallet.entity";
import { PatientWallet } from "../entity/patient-wallet.entity";
import { ChargeWalletDto } from "./dto/charge-wallet.dto";

export class WalletService {
  constructor(
    private patientWalletRepo = AppDataSource.getRepository(PatientWallet),
    private drWalletRepo = AppDataSource.getRepository(DoctorWallet)
  ) {}

  async createPatientWallet(patientId: number): Promise<PatientWallet> {
    const existingWallet = await this.patientWalletRepo.findOne({
      where: { patientId },
    });
    if (existingWallet)
      throw new Error("Wallet already exists for this patient");

    const wallet = this.patientWalletRepo.create({ patientId, balance: 0 });
    return await this.patientWalletRepo.save(wallet);
  }

  async createDrWallet(doctorId: number): Promise<DoctorWallet> {
    const existingWallet = await this.drWalletRepo.findOne({
      where: { doctorId },
    });
    if (existingWallet)
      throw new Error("Wallet already exists for this doctor");

    const wallet = this.drWalletRepo.create({ doctorId, balance: 0 });
    return await this.drWalletRepo.save(wallet);
  }

  async chargeWallet(
    data: ChargeWalletDto,
    patientId: number
  ): Promise<{ message: string }> {
    return await AppDataSource.transaction(
      async (entityManager: EntityManager) => {
        const patientWallet = await entityManager.findOne(PatientWallet, {
          where: { patientId: patientId },
        });

        if (!patientWallet) throw new Error("Patient wallet not found");

        // Update the wallet balance
        patientWallet.balance += data.amount;
        await entityManager.save(patientWallet);

        return { message: "Wallet charged successfully" };
      }
    );
  }

  async getPatientWallet(patientId: number): Promise<PatientWallet | null> {
    const wallet = await this.patientWalletRepo.findOne({
      where: { patientId },
    });
    return wallet;
  }

  async getDrWallet(doctorId: number): Promise<DoctorWallet | null> {
    const wallet = await this.drWalletRepo.findOne({
      where: { doctorId },
    });
    return wallet;
  }
}
