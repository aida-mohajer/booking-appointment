import { EntityManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { CreateAvailabilityDto } from "./dto/create-availability.dto";
import { ReadAvailabilitiesDto } from "./dto/read-availabilities.dto";
import { Availability } from "../entity/availability.entity";
import { Doctor } from "../entity/doctor.entity";
import { Pagination } from "../middlewares/pagination";

export class AvailabilityService {
  constructor(
    private availabilityRepo = AppDataSource.getRepository(Availability),
    private doctorRepo = AppDataSource.getRepository(Doctor)
  ) {}

  async createAvailability(
    doctorId: number,
    data: CreateAvailabilityDto
  ): Promise<{ message?: string; error?: string }> {
    try {
      const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
      if (!doctor) {
        throw new Error("Doctor not found");
      }

      const existingAvailability = await this.availabilityRepo.findOne({
        where: { doctor, availableDate: data.availableDate },
      });

      if (existingAvailability) {
        return { error: "Time slot already exists" };
      }
      const availability = this.availabilityRepo.create({
        doctor,
        availableDate: data.availableDate,
        isAvailable: true,
      });

      await this.availabilityRepo.save(availability);

      return { message: "Availability created successfully" };
    } catch (error) {
      console.error("Error during create availability", error);
      return { error: "Internal server error" };
    }
  }

  //the difference between get availability by patient and by dr is that doctor can get all availabilities base on the filter
  //but the patient just get those that their isAvailable is true
  async getAvailabilitiesByDr(
    doctorId: number,
    pagination: Pagination,
    startDate?: Date,
    endDate?: Date,
    year?: number,
    month?: number,
    day?: number
  ): Promise<ReadAvailabilitiesDto> {
    const { skip, limit } = pagination;
    try {
      const doctor = await this.doctorRepo.findOne({
        where: { id: doctorId },
      });
      if (!doctor) {
        return { error: "Doctor not found" };
      }
      let queryBuilder = this.availabilityRepo
        .createQueryBuilder("availability")
        .select([
          "availability.id",
          "availability.availableDate",
          "availability.isAvailable",
        ])
        .where("availability.doctorId = :doctorId", { doctorId });

      //filter by range
      if (startDate && endDate) {
        queryBuilder.andWhere(
          "availability.availableDate BETWEEN :startDate AND :endDate",
          {
            startDate,
            endDate,
          }
        );
      }

      //filter by date
      if (year && month && day) {
        const searchDate = `${year}-${String(month).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`;
        queryBuilder = queryBuilder.andWhere(
          "CAST(availability.availableDate AS DATE) = :date",
          { date: searchDate }
        );
      }
      // Filter by entire month and year if only `year` and `month` are provided
      else if (year && month) {
        queryBuilder = queryBuilder.andWhere(
          "YEAR(availability.availableDate) = :year AND MONTH(availability.availableDate) = :month",
          { year, month }
        );
      }

      const totalAvailability = await queryBuilder.getCount();

      // Apply pagination
      const allAvailability = await queryBuilder
        .orderBy("availability.availableDate", "ASC")
        .skip(skip)
        .take(limit)
        .getMany();
      const totalPages = Math.ceil(totalAvailability / limit);

      return {
        message:
          totalAvailability > 0
            ? "Availabilities retrieved successfully"
            : "No availability found matching the search criteria.",
        response: allAvailability,
        totalPages,
        totalAvailability,
      };
    } catch (error) {
      console.error("Error during retrieve availabilities", error);
      return { error: "Internal server error" };
    }
  }

  async getAvailabilitiesByPatient(
    doctorId: number,
    pagination: Pagination,
    startDate?: Date,
    endDate?: Date,
    year?: number,
    month?: number,
    day?: number
  ): Promise<ReadAvailabilitiesDto> {
    const { skip, limit } = pagination;
    try {
      //to prevent look or search for past dates
      // const today = new Date();
      // today.setHours(0, 0, 0, 0); // Set time to midnight to ensure accurate comparison

      let queryBuilder = this.availabilityRepo
        .createQueryBuilder("availability")
        .select([
          "availability.id",
          "availability.availableDate",
          "availability.isAvailable",
        ])
        .where("availability.doctorId = :doctorId", { doctorId })
        // .andWhere("availability.availableDate >= :today", { today })
        .andWhere("availability.isAvailable = :isAvailable", {
          isAvailable: true,
        });

      //filter by range
      if (startDate && endDate) {
        queryBuilder.andWhere(
          "availability.availableDate BETWEEN :startDate AND :endDate",
          {
            startDate,
            endDate,
          }
        );
      }

      //filter by date
      if (year && month && day) {
        const searchDate = `${year}-${String(month).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`;
        queryBuilder = queryBuilder.andWhere(
          "CAST(availability.availableDate AS DATE) = :date",
          { date: searchDate }
        );
      }
      // Filter by entire month and year if only `year` and `month` are provided
      else if (year && month) {
        queryBuilder = queryBuilder.andWhere(
          "YEAR(availability.availableDate) = :year AND MONTH(availability.availableDate) = :month",
          { year, month }
        );
      }
      const totalAvailability = await queryBuilder.getCount();

      // Apply pagination
      const allAvailability = await queryBuilder
        .orderBy("availability.availableDate", "ASC")
        .skip(skip)
        .take(limit)
        .getMany();
      const totalPages = Math.ceil(totalAvailability / limit);

      return {
        message:
          totalAvailability > 0
            ? "Availabilities retrieved successfully"
            : "No availability found matching the search criteria.",
        response: allAvailability,
        totalPages,
        totalAvailability,
      };
    } catch (error) {
      console.error("Error during retrieve availabilities", error);
      return { error: "Internal server error" };
    }
  }

  async removeAvailability(
    availabilityId: number,
    doctorId: number
  ): Promise<{ error?: string; message?: string }> {
    const entityManager = AppDataSource.createEntityManager();

    return await entityManager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const doctor = await transactionalEntityManager.findOne(Doctor, {
            where: { id: doctorId },
          });
          if (!doctor) {
            return { error: "Doctor not found" };
          }

          const availability = await transactionalEntityManager.findOne(
            Availability,
            {
              where: { id: availabilityId },
            }
          );
          if (!availability) {
            return { error: "Availability not found" };
          }

          await transactionalEntityManager.delete(Availability, {
            id: availabilityId,
          });

          return { message: "Availability removed successfully" };
        } catch (error) {
          console.error("Error during remove availability:", error);
          return { error: "An unexpected error occurred" };
        }
      }
    );
  }
}
