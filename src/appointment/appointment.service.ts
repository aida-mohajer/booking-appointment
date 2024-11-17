import { EntityManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { Doctor } from "../entity/doctor.entity";
import { Appointment } from "../entity/appointment.entity";
import { Search } from "../middlewares/search";
import { ReadGetAppointmentsByPatientDto } from "./dto/read-get-appointments-patient.dto";
import { ReadGetAppointmentsByDrDto } from "./dto/read-get-appoitments-dr.dto";
import { Pagination } from "../middlewares/pagination";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { DoctorSchedule } from "../entity/doctorSchedule.entity";
import { Hospital } from "../entity/hospital.entity";
import { DrScheduleService } from "../doctor-schedule/dr-schedule.service";

export class AppointmentService {
  constructor(
    private drScheduleRepo = AppDataSource.getRepository(DoctorSchedule),
    private appointmentRepo = AppDataSource.getRepository(Appointment),
    private hospitalRepo = AppDataSource.getRepository(Hospital),
    private doctorRepo = AppDataSource.getRepository(Doctor)
  ) {}

  drScheduleService = new DrScheduleService(this.drScheduleRepo);

  async createAppointment(
    patientId: number,
    doctorId: number,
    hospitalId: number,
    data: CreateAppointmentDto
  ): Promise<{ message?: string; error?: string }> {
    try {
      const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
      if (!doctor) return { error: "Doctor not found" };

      const hospital = await this.hospitalRepo.findOne({
        where: { id: hospitalId },
      });
      if (!hospital) return { error: "Hospital not found" };

      // Convert startDate and endDate strings to Date objects for comparison
      const date = new Date(data.appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (date < today) {
        return { error: "Date is in the past" };
      }

      // Convert appointmentDate to a Date object and get the weekday
      const weekday = date.toLocaleString("en-US", { weekday: "long" });

      const schedule = await this.drScheduleRepo.findOne({
        where: { weekDay: weekday, doctorId, hospitalId },
      });
      if (!schedule) {
        return { error: "Doctor has no slot on this day" };
      }

      // Check if the selected time slot is available (not booked, not cancelled, and not in the past)
      const availableSlots = await this.drScheduleService.getAvailableSlots(
        doctorId,
        hospitalId,
        data.appointmentDate
      );
      const slotStatus = availableSlots.availableSlots?.find(
        (slot) => slot.time === data.time
      )?.status;

      if (!slotStatus) {
        return { error: "Invalid slot" }; // This would mean the slot doesn't exist in the available slots (e.g., it's outside the schedule)
      }

      if (slotStatus === "unavailable" || slotStatus === "booked") {
        return { error: "The selected time slot is not available" };
      }

      const appointment = this.appointmentRepo.create({
        doctor,
        hospital,
        patientId,
        appointmentDate: data.appointmentDate,
        time: data.time,
      });
      await this.appointmentRepo.save(appointment);

      return { message: "Appointment created successfully" };
    } catch (error) {
      console.error("Error during create appointment", error);
      return { error: "Internal server error" };
    }
  }

  async getAppointmentsByDr(
    doctorId: number,
    hospitalId: number,
    pagination: Pagination,
    startDate: string,
    endDate: string,
    search?: Search
  ): Promise<ReadGetAppointmentsByDrDto> {
    const { skip, limit } = pagination;
    const { name = "" } = search || {};
    try {
      const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
      if (!doctor) return { error: "Doctor not found" };

      const hospital = await this.hospitalRepo.findOne({
        where: { id: hospitalId },
      });
      if (!hospital) return { error: "Hospital not found" };

      let queryBuilder = this.appointmentRepo
        .createQueryBuilder("appointment")
        .leftJoinAndSelect("appointment.patient", "patient")
        .select([
          "appointment.id",
          "appointment.appointmentDate",
          "appointment.time",
          "patient.id",
          "patient.name",
          "patient.lastName",
          "patient.email",
          "patient.contactNumber",
          "patient.age",
          "patient.gender",
        ])
        .where("appointment.doctorId = :doctorId", {
          doctorId,
        })
        .andWhere("appointment.hospitalId = :hospitalId", {
          hospitalId,
        })
        .andWhere("appointment.appointmentDate >= :startDate", {
          startDate,
        })
        .andWhere("appointment.appointmentDate <= :endDate", {
          endDate,
        });

      //filter by patient name
      if (name) {
        queryBuilder.andWhere(
          "(patient.name LIKE :name OR patient.lastName LIKE :lastName)",
          {
            name: `%${name}%`,
            lastName: `%${name}%`,
          }
        );
      }

      const totalAppointments = await queryBuilder.getCount();

      // Apply pagination
      const allAppointment = await queryBuilder
        .orderBy("appointment.appointmentDate", "ASC")
        .skip(skip)
        .take(limit)
        .getMany();
      const totalPages = Math.ceil(totalAppointments / limit);

      return {
        message:
          totalAppointments > 0
            ? "Appointmnets retrieved successfully"
            : "No appointmnet found matching the search criteria.",
        response: allAppointment,
        totalPages,
        totalAppointments,
      };
    } catch (error) {
      console.error("Error during retrieve doctor appointments", error);
      return { error: "Internal server error" };
    }
  }

  async getAppointmentsByPatient(
    patientId: number,
    startDate?: string,
    endDate?: string
  ): Promise<ReadGetAppointmentsByPatientDto> {
    try {
      const queryBuilder = this.appointmentRepo
        .createQueryBuilder("appointment")
        .leftJoinAndSelect("appointment.doctor", "doctor")
        .leftJoinAndSelect("appointment.hospital", "hospital")
        .leftJoinAndSelect("doctor.specializations", "specializations")
        .select([
          "appointment.id",
          "appointment.appointmentDate",
          "appointment.time",
          "hospital.id",
          "hospital.name",
          "doctor.id",
          "doctor.name",
          "doctor.lastName",
          "specializations.value",
        ])
        .where("appointment.patientId = :patientId", {
          patientId,
        });

      if (startDate && endDate) {
        queryBuilder.andWhere("appointment.appointmentDate >= :startDate", {
          startDate,
        });
        queryBuilder.andWhere("appointment.appointmentDate <= :endDate", {
          endDate,
        });
      }

      const allAppointment = await queryBuilder
        .orderBy("appointment.appointmentDate", "ASC")
        .getMany();

      return { response: allAppointment };
    } catch (error) {
      console.error("Error during retrieve patient appointments", error);
      return { error: "Internal server error" };
    }
  }

  async cancelAppointment(
    appointmentId: number,
    patientId: number
  ): Promise<{ error?: string; message?: string }> {
    const entityManager = AppDataSource.createEntityManager();

    return await entityManager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const appointment = await transactionalEntityManager.findOne(
            Appointment,
            {
              where: { id: appointmentId },
            }
          );
          if (!appointment) {
            return { error: "Appointment not found" };
          }

          if (appointment.patientId !== patientId) {
            return {
              error: "You are not authorized to delete this appointment",
            };
          }

          await transactionalEntityManager.delete(Appointment, {
            id: appointmentId,
          });

          return { message: "Appointment removed successfully" };
        } catch (error) {
          console.error("Error during remove appointment:", error);
          return { error: "An unexpected error occurred" };
        }
      }
    );
  }
}
