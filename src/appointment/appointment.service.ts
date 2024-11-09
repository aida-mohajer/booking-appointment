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
    availabilityId: number
  ): Promise<{ message?: string; error?: string }> {
    try {
      const availability = await this.availabilityRepo.findOne({
        where: { id: availabilityId },
      });
      if (!availability) {
        return { error: "Availability not found" };
      }

      // Check if the availability date is a future date and time
      const now = new Date();
      const availabilityDateTime = new Date(availability.availableDate);

      if (availabilityDateTime < now) {
        return { error: "Cannot book an appointment for a past time." };
      }

      const doctor = await this.doctorRepo.findOne({
        where: { id: availability.doctorId },
      });
      if (!doctor) {
        return { error: "Doctor not found" };
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
    startDate: Date,
    endDate: Date,
    search?: Search
  ): Promise<ReadGetAppointmentsByDrDto> {
    const { skip, limit } = pagination;
    const { name = "" } = search || {};
    try {
      // Set endDate to include the full day
      const adjustedEndDate = new Date(endDate);
      adjustedEndDate.setHours(23, 59, 59, 999);

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
        })
        .andWhere("availability.availableDate >= :startDate", {
          startDate,
        })
        .andWhere("availability.availableDate <= :adjustedEndDate", {
          adjustedEndDate,
        });

      //filter by patient name
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
    patientId: number,
    startDate?: Date,
    endDate?: Date
  ): Promise<ReadGetAppointmentsByPatientDto> {
    try {
      let adjustedEndDate: Date | undefined;
      if (endDate) {
        adjustedEndDate = new Date(endDate);
        adjustedEndDate.setHours(23, 59, 59, 999);
      }
      const queryBuilder = this.appointmentRepo
        .createQueryBuilder("appointment")
        .leftJoinAndSelect("appointment.availability", "availability")
        .leftJoinAndSelect("appointment.doctor", "doctor")
        .leftJoinAndSelect("doctor.specializations", "specializations")
        .select([
          "appointment.id",
          "availability.availableDate",
          "doctor.id",
          "doctor.name",
          "doctor.lastName",
          "specializations.value",
        ])
        .where("appointment.patientId = :patientId", {
          patientId,
        });

      if (startDate && endDate) {
        queryBuilder.andWhere("availability.availableDate >= :startDate", {
          startDate,
        });
        queryBuilder.andWhere(
          "availability.availableDate <= :adjustedEndDate",
          {
            adjustedEndDate,
          }
        );
      }

      const allAppointment = await queryBuilder
        .orderBy("availability.availableDate", "ASC")
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
