import { EntityManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { DrScheduleService } from "../doctor-schedule/dr-schedule.service";
import { Doctor } from "../entity/doctor.entity";
import { DoctorSchedule } from "../entity/doctorSchedule.entity";
import { DrExceptions } from "../entity/drExceptions.entity";
import { Hospital } from "../entity/hospital.entity";
import { AddExceptionDto } from "./dto/add-exception.dto";

export class DrExceptionsService {
  constructor(
    private drScheduleRepo = AppDataSource.getRepository(DoctorSchedule),
    private doctorRepo = AppDataSource.getRepository(Doctor),
    private hospitalRepo = AppDataSource.getRepository(Hospital),
    private drExceptionsRepo = AppDataSource.getRepository(DrExceptions)
  ) {}

  drScheduleService = new DrScheduleService(this.drScheduleRepo);

  async addException(
    doctorId: number,
    hospitalId: number,
    data: AddExceptionDto
  ): Promise<{ message?: string; error?: string }> {
    try {
      const doctor = await this.doctorRepo.findOne({
        where: { id: doctorId },
      });
      if (!doctor) return { error: "Doctor not found" };

      const hospital = await this.hospitalRepo.findOne({
        where: { id: hospitalId },
      });
      if (!hospital) return { error: "Hospital not found" };

      // Convert startDate and endDate strings to Date objects for comparison
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (startDate < today || endDate < today) {
        return { error: "Date is in the past" };
      }

      const existingException = await this.drExceptionsRepo.findOne({
        where: {
          doctor,
          hospital,
          startDate: data.startDate,
          endDate: data.endDate,
          startTime: data.startTime,
          endTime: data.endTime,
        },
      });
      if (existingException) {
        return { error: "This exception created before" };
      }

      const exception = this.drExceptionsRepo.create({
        doctor,
        hospital,
        startDate: data.startDate,
        endDate: data.endDate,
        startTime: data.startTime,
        endTime: data.endTime,
      });
      await this.drExceptionsRepo.save(exception);

      return { message: "Exception added successfully" };
    } catch (error) {
      console.error("Error during adding exception", error);
      return { error: "Internal server error" };
    }
  }

  async getExceptions(
    doctorId: number,
    hospitalId: number
  ): Promise<{ error?: string; exceptions?: DrExceptions[] }> {
    try {
      const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
      if (!doctor) {
        return { error: "Doctor not found" };
      }
      const hospital = await this.hospitalRepo.findOne({
        where: { id: hospitalId },
      });
      if (!hospital) return { error: "Hospital not found" };

      let exceptions = await this.drExceptionsRepo
        .createQueryBuilder("drSchedule")
        .select([
          "drSchedule.id",
          "drSchedule.startDate",
          "drSchedule.endDate",
          "drSchedule.startTime",
          "drSchedule.endTime",
        ])
        .where("drSchedule.doctorId = :doctorId", {
          doctorId,
        })
        .andWhere("drSchedule.hospitalId = :hospitalId", {
          hospitalId,
        })
        .getMany();

      return { exceptions };
    } catch (error) {
      console.error("Error during retrieve doctor appointments", error);
      return { error: "Internal server error" };
    }
  }

  async removeException(
    doctorId: number,
    exceptionId: number
  ): Promise<{ error?: string; message?: string }> {
    const entityManager = AppDataSource.createEntityManager();

    return await entityManager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const exception = await transactionalEntityManager.findOne(
            DrExceptions,
            {
              where: { id: exceptionId },
            }
          );
          if (!exception) {
            return { error: "Exception not found" };
          }

          if (exception.doctorId !== doctorId) {
            return {
              error: "You are not authorized to delete this exception",
            };
          }

          await transactionalEntityManager.delete(DrExceptions, {
            id: exceptionId,
          });

          return { message: "Exception removed successfully" };
        } catch (error) {
          console.error("Error during remove exception:", error);
          return { error: "An unexpected error occurred" };
        }
      }
    );
  }
}
