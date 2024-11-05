import { EntityManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { Doctor } from "../entity/doctor.entity";
import { Appointment } from "../entity/appointment.entity";
import { Search } from "../middlewares/search";
import { ReadGetAppointmentsByPatientDto } from "./dto/read-get-appointments-patient.dto";
import { ReadGetAppointmentsByDrDto } from "./dto/read-get-appoitments-dr.dto";
import { Availability } from "../entity/availability.entity";
import { Pagination } from "../middlewares/pagination";

export class AppointmentService {
  constructor(
    private availabilityRepo = AppDataSource.getRepository(Availability),
    private appointmentRepo = AppDataSource.getRepository(Appointment),
    private doctorRepo = AppDataSource.getRepository(Doctor)
  ) {}

  async createAppointment(
    patientId: number,
    doctorId: number,
    availabilityId: number
  ): Promise<{ message?: string; error?: string }> {
    try {
      const doctor = await this.doctorRepo.findOne({
        where: { id: doctorId },
      });
      if (!doctor) {
        return { error: "Doctor not found" };
      }

      const availability = await this.availabilityRepo.findOne({
        where: { id: availabilityId },
      });
      if (!availability) {
        return { error: "Availability not found" };
      }

      // Check if the availability date is a future date
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to midnight for comparison
      const availabilityDate = new Date(availability.availableDate);

      if (availabilityDate < today) {
        return { error: "Cannot book an appointment for a past date." };
      }

      if (availability.isAvailable == false) {
        return { error: "This availability has already been booked." };
      }

      const appointment = this.appointmentRepo.create({
        availability,
        patientId: patientId,
        doctor,
      });
      await this.appointmentRepo.save(appointment);

      //change availability status
      availability.isAvailable = false;
      await this.availabilityRepo.save(availability);

      return { message: "Appointment created successfully" };
    } catch (error) {
      console.error("Error during create appointment", error);
      return { error: "Internal server error" };
    }
  }

  async getAppointmentsByDr(
    doctorId: number,
    pagination: Pagination,
    isAvailable?: boolean,
    search?: Search,
    startDate?: Date,
    endDate?: Date,
    year?: number,
    month?: number,
    day?: number
  ): Promise<ReadGetAppointmentsByDrDto> {
    const { skip, limit } = pagination;
    const { name = "" } = search || {};
    try {
      let queryBuilder = this.appointmentRepo
        .createQueryBuilder("appointment")
        .leftJoinAndSelect("appointment.availability", "availability")
        .leftJoinAndSelect("appointment.patient", "patient")
        .select([
          "appointment.id",
          "availability.availableDate",
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
        });

      if (isAvailable) {
        queryBuilder.andWhere("availability.isAvailable = :isAvailable", {
          isAvailable: isAvailable,
        });
      }

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
      } else if (year) {
        queryBuilder = queryBuilder.andWhere(
          "YEAR(availability.availableDate) = :year",
          { year }
        );
      }

      if (name) {
        queryBuilder.andWhere(
          "(patient.name LIKE :name AND patient.lastName LIKE :lastName)",
          {
            name: `%${name}%`,
            lastName: `%${name}%`,
          }
        );
      }
      const totalAppointments = await queryBuilder.getCount();

      // Apply pagination
      const allAppointment = await queryBuilder
        .orderBy("availability.availableDate", "ASC")
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
    patientId: number
  ): Promise<ReadGetAppointmentsByPatientDto> {
    try {
      const appointments = await this.appointmentRepo
        .createQueryBuilder("appointment")
        .leftJoinAndSelect("appointment.availability", "availability")
        .leftJoinAndSelect("appointment.doctor", "doctor")
        .select([
          "appointment.id",
          "availability.availableDate",
          "appointment.doctorId",
          "doctor.name",
          "doctor.lastName",
        ])
        .where("appointment.patientId = :patientId", {
          patientId,
        })
        .getMany();
      return { response: appointments };
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

          // Update availability status
          const updateAvailability = await transactionalEntityManager.findOne(
            Availability,
            {
              where: { id: appointment.availabilityId },
            }
          );
          if (updateAvailability) {
            updateAvailability.isAvailable = true;
            await transactionalEntityManager.save(updateAvailability);
          }

          return { message: "Appointment removed successfully" };
        } catch (error) {
          console.error("Error during remove appointment:", error);
          return { error: "An unexpected error occurred" };
        }
      }
    );
  }
}
