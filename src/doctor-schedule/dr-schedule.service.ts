import { EntityManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { Doctor } from "../entity/doctor.entity";
import { DoctorSchedule } from "../entity/doctorSchedule.entity";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { Hospital } from "../entity/hospital.entity";
import { ReadScheduleDto } from "./dto/read-schedule.dto";
import { Appointment } from "../entity/appointment.entity";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";
import { DrExceptions } from "../entity/drExceptions.entity";

export class DrScheduleService {
  constructor(
    private drScheduleRepo = AppDataSource.getRepository(DoctorSchedule),
    private doctorRepo = AppDataSource.getRepository(Doctor),
    private hospitalRepo = AppDataSource.getRepository(Hospital),
    private appointmentRepo = AppDataSource.getRepository(Appointment),
    private drExceptionsRepo = AppDataSource.getRepository(DrExceptions)
  ) {}

  async createSchedule(
    doctorId: number,
    hospitalId: number,
    data: CreateScheduleDto
  ): Promise<{ message?: string; error?: string }> {
    try {
      const doctor = await this.doctorRepo.findOne({
        where: { id: doctorId },
        relations: ["hospitals"],
      });

      if (!doctor) {
        return { error: "Doctor not found" };
      }

      const hospital = await this.hospitalRepo.findOne({
        where: { id: hospitalId },
      });
      if (!hospital) {
        return { error: "Hospital not found" };
      }

      const isAssociatedWithHospital = doctor.hospitals.some(
        (hospital) => hospital.id === hospitalId
      );
      if (!isAssociatedWithHospital) {
        return { error: "Doctor does not work in this hospital" };
      }

      // Convert startDate and endDate strings to Date objects for comparison
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Check if startDate is today or in the future
      if (startDate < today) {
        return { error: "Start date cannot be in the past" };
      }

      // Check if endDate is in the future and after startDate
      if (endDate <= startDate) {
        return { error: "End date must be after the start date" };
      }

      const existingSchedule = await this.drScheduleRepo.findOne({
        where: {
          doctorId: doctor.id,
          hospitalId: hospitalId,
          weekDay: data.weekDay,
        },
      });

      if (existingSchedule) {
        return { error: "This schedule already exists for this day" };
      }
      const schedule = this.drScheduleRepo.create({
        doctor,
        hospital,
        weekDay: data.weekDay,
        startTime: data.startTime,
        endTime: data.endTime,
        startDate: data.startDate,
        endDate: data.endDate,
        duration: data.duration,
        price: data.price,
      });

      await this.drScheduleRepo.save(schedule);

      return { message: "Schedule created successfully" };
    } catch (error) {
      console.error("Error during create schedule", error);
      return { error: "Internal server error" };
    }
  }

  async getScheduleByDr(
    doctorId: number,
    hospitalId: number
  ): Promise<ReadScheduleDto> {
    try {
      const doctor = await this.doctorRepo.findOne({
        where: { id: doctorId },
        relations: ["hospitals"],
      });
      if (!doctor) {
        return { error: "Doctor not found" };
      }
      const hospital = await this.hospitalRepo.findOne({
        where: { id: hospitalId },
      });
      if (!hospital) {
        return { error: "Hospital not found" };
      }

      const isAssociatedWithHospital = doctor.hospitals.some(
        (hospital) => hospital.id === hospitalId
      );
      if (!isAssociatedWithHospital) {
        return { error: "Doctor does not work in this hospital" };
      }

      let queryBuilder = this.drScheduleRepo
        .createQueryBuilder("doctorSchedule")
        .select([
          "doctorSchedule.id",
          "doctorSchedule.weekDay",
          "doctorSchedule.price",
          "doctorSchedule.startTime",
          "doctorSchedule.endTime",
          "doctorSchedule.startDate",
          "doctorSchedule.endDate",
        ])
        .where("doctorSchedule.doctorId = :doctorId", { doctorId })
        .andWhere("doctorSchedule.hospitalId = :hospitalId", { hospitalId });

      const schedule = await queryBuilder.getMany();
      return {
        message: "Schedule retrieved successfully",
        response: schedule,
      };
    } catch (error) {
      console.error("Error during retrieve schedule", error);
      return { error: "Internal server error" };
    }
  }

  async updateDrSchedule(
    data: UpdateScheduleDto,
    doctorId: number,
    scheduleId: number
  ): Promise<{ message?: string; error?: string }> {
    try {
      const doctor = await this.doctorRepo.findOne({
        where: { id: doctorId },
      });
      if (!doctor) {
        return { error: "Doctor not found" };
      }

      const schedule = await this.drScheduleRepo.findOne({
        where: { id: scheduleId, doctorId: doctorId },
      });
      if (!schedule) {
        return { error: "Schedule not found" };
      }

      Object.assign(schedule, data);
      await this.drScheduleRepo.save(schedule);

      return { message: "Schedule updated successfully" };
    } catch (error) {
      console.error("Error during updating schedule", error);
      return { error: "Internal server error" };
    }
  }

  async removeDrSchedule(
    doctorId: number,
    scheduleId: number
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
          const schedule = await transactionalEntityManager.findOne(
            DoctorSchedule,
            {
              where: { id: scheduleId, doctorId: doctorId },
            }
          );
          if (!schedule) {
            return { error: "Schedule not found" };
          }

          await transactionalEntityManager.delete(DoctorSchedule, {
            id: scheduleId,
          });

          return { message: "Schedule removed successfully" };
        } catch (error) {
          console.error("Error during remove schedule:", error);
          return { error: "An unexpected error occurred" };
        }
      }
    );
  }

  async getAvailableSlots(
    doctorId: number,
    hospitalId: number,
    date: string
  ): Promise<{
    error?: string;
    availableSlots?: { time: string; status: string }[];
    price?: number;
  }> {
    try {
      const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
      if (!doctor) {
        return { error: "Doctor not found" };
      }

      const hospital = await this.hospitalRepo.findOne({
        where: { id: hospitalId },
      });
      if (!hospital) {
        return { error: "Hospital not found" };
      }

      const doctorSchedules = await this.drScheduleRepo.find({
        where: { doctorId, hospitalId },
      });
      if (doctorSchedules.length === 0) {
        return { error: "No schedule found" };
      }

      // Parse the provided date and check if it's today or in the past
      const dateObj = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dateObj < today) {
        return { error: "Date is in the past" };
      }

      // Get the weekday name from the provided date
      const weekday = dateObj.toLocaleString("en-US", { weekday: "long" });
      const schedule = await this.drScheduleRepo.findOne({
        where: { weekDay: weekday, doctorId, hospitalId },
      });

      if (!schedule) {
        return { error: "Doctor has no slots on this day" };
      }

      // Extract schedule details
      const { startTime, endTime, duration, price } = schedule;

      // Generate all possible slots based on the schedule
      const availableSlots = this.generateTimeSlots(
        startTime,
        endTime,
        duration
      ).map((slot) => ({ time: slot, status: "available" }));

      // Fetch booked slots for the doctor on the given date
      const bookedSlots = await this.appointmentRepo.find({
        where: { doctorId, hospitalId, appointmentDate: date },
        select: ["time"],
      });
      const bookedTimes = new Set(bookedSlots.map((booking) => booking.time));

      // Fetch exception slots for the given date
      const exceptionSlots = await this.drExceptionsRepo.find({
        where: { doctorId, hospitalId, startDate: date, endDate: date },
        select: ["startTime", "endTime"],
      });

      const exceptionTimes = new Set();
      exceptionSlots.forEach((exception) => {
        const exceptionStartTime = this.convertTimeToMinutes(
          exception.startTime
        );
        const exceptionEndTime = this.convertTimeToMinutes(exception.endTime);

        availableSlots.forEach((slot) => {
          const [hour, minute] = slot.time.split(":").map(Number);
          const slotStartTime = hour * 60 + minute;

          if (
            slotStartTime >= exceptionStartTime &&
            slotStartTime < exceptionEndTime
          ) {
            exceptionTimes.add(slot.time);
          }
        });
      });

      // Check if the date is today and calculate current time in minutes
      const isToday = dateObj.toDateString() === today.toDateString();
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      // Assign statuses to slots
      const slotsWithStatus = availableSlots.map((slot) => {
        const [hour, minute] = slot.time.split(":").map(Number);
        const slotStartTime = hour * 60 + minute;

        let status = "available";

        if (isToday && slotStartTime < currentTime) {
          status = "unavailable"; // Past time slots are unavailable
        } else if (bookedTimes.has(slot.time)) {
          status = "booked"; // Slot is booked
        } else if (exceptionTimes.has(slot.time)) {
          status = "unavailable"; // Slot falls under exception
        }

        return { time: slot.time, status };
      });

      return { availableSlots: slotsWithStatus, price: price };
    } catch (error) {
      console.error("Error in getAvailableSlots:", error);
      return { error: "An unexpected error occurred" };
    }
  }
  // Helper function to generate time slots
  private generateTimeSlots(
    startTime: string,
    endTime: string,
    duration: number
  ): string[] {
    const slots: string[] = [];
    const start = new Date(`1970-01-01T${startTime}:00`); // Use a fixed date
    const end = new Date(`1970-01-01T${endTime}:00`);

    while (start < end) {
      slots.push(start.toTimeString().slice(0, 5)); // Format as HH:MM
      start.setMinutes(start.getMinutes() + duration); // Increment by duration
    }

    return slots;
  }

  // Helper function to convert time "HH:mm" to minutes since midnight
  convertTimeToMinutes(time: string): number {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
  }
}
