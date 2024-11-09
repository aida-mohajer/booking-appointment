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
        return { error: "Doctor not found" };
      }

      // Check if the availability date is a future date and time
      // const now = new Date();
      // const availabilityDateTime = new Date(data.availableDate);

      // if (availabilityDateTime < now) {
      //   return { error: "Cannot create an availability for a past time." };
      // }

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
    startDate: Date,
    endDate: Date,
    isAvailable?: boolean
  ): Promise<ReadAvailabilitiesDto> {
    const { skip, limit } = pagination;
    try {
      const doctor = await this.doctorRepo.findOne({
        where: { id: doctorId },
      });
      if (!doctor) {
        return { error: "Doctor not found" };
      }

      // Set endDate to include the full day
      const adjustedEndDate = new Date(endDate);
      adjustedEndDate.setHours(23, 59, 59, 999);

      let queryBuilder = this.availabilityRepo
        .createQueryBuilder("availability")
        .select([
          "availability.id",
          "availability.availableDate",
          "availability.isAvailable",
        ])
        .where("availability.doctorId = :doctorId", { doctorId })
        .andWhere("availability.availableDate >= :startDate", {
          startDate,
        })
        .andWhere("availability.availableDate <= :adjustedEndDate", {
          adjustedEndDate,
        });

      //filter by isAvailable
      if (isAvailable !== undefined) {
        queryBuilder.andWhere("availability.isAvailable = :isAvailable", {
          isAvailable,
        });
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
    startDate: Date,
    endDate: Date
  ): Promise<ReadAvailabilitiesDto> {
    const { skip, limit } = pagination;
    try {
      //to prevent look or search for past dates
      const now = new Date();

      const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
      if (!doctor) {
        return { error: "Doctor not found" };
      }

      const adjustedEndDate = new Date(endDate);
      adjustedEndDate.setHours(23, 59, 59, 999);

      let queryBuilder = this.availabilityRepo
        .createQueryBuilder("availability")
        .select([
          "availability.id",
          "availability.availableDate",
          "availability.isAvailable",
        ])
        .where("availability.doctorId = :doctorId", { doctorId })
        .andWhere("availability.availableDate >= :startDate", {
          startDate,
        })
        .andWhere("availability.availableDate <= :adjustedEndDate", {
          adjustedEndDate,
        });

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
              where: { id: availabilityId, doctorId: doctorId },
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
