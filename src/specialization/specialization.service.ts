import { In } from "typeorm";
import { AppDataSource } from "../data-source";
import { Doctor } from "../entity/doctor.entity";
import { AddSpecializationIdsToDrDto } from "./dto/add-specializations-dr.dto";
import { CreateSpecializationDto } from "./dto/create-specialization.dto";
import { Specialization } from "../entity/specialization.entity";
import { ReadGetSpecializationsDto } from "./dto/read-get-specializations.dto";

export class SpecializationService {
  constructor(
    private specializationRepo = AppDataSource.getRepository(Specialization),
    private doctorRepo = AppDataSource.getRepository(Doctor)
  ) {}
  async createSpecialization(
    data: CreateSpecializationDto
  ): Promise<{ message?: string; error?: string }> {
    try {
      const existSpecialization = await this.specializationRepo.findOne({
        where: { value: data.value },
      });
      if (existSpecialization) {
        return { error: "This specialization added before" };
      }

      const specialization = this.specializationRepo.create({
        value: data.value,
      });

      await this.specializationRepo.save(specialization);

      return {
        message: "Specialization added successfully",
      };
    } catch (error) {
      console.error("Error during adding specialization:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async getspecializations(): Promise<ReadGetSpecializationsDto> {
    try {
      const specializations = await this.specializationRepo.find({
        select: ["id", "value"],
      });

      return { response: specializations };
    } catch (error) {
      console.error("Error during retrieve specializations:", error);
      return { error: "An unexpected error occurred" };
    }
  }

  async removeSpecialization(
    specializationId: number
  ): Promise<{ message?: string; error?: string }> {
    try {
      const specialization = await this.specializationRepo.findOne({
        where: { id: specializationId },
      });
      if (!specialization) {
        return { error: "Specialization not found" };
      }

      await this.specializationRepo.remove(specialization);

      return {
        message: "Specialization removed successfully",
      };
    } catch (error) {
      console.error("Error during removing specialization:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async addSpecializationIdsToDr(
    doctorId: number,
    data: AddSpecializationIdsToDrDto
  ): Promise<{ error?: string; message?: string }> {
    try {
      const doctor = await this.doctorRepo.findOne({
        where: { id: doctorId },
        relations: ["specializations"],
      });
      if (!doctor) {
        return { error: "Doctor not found" };
      }

      // find specializations based on the IDs provided by the user in data.specializationIds.
      const newSpecializationIds = await this.specializationRepo.findBy({
        id: In(data.specializationIds),
      });

      //This check ensures that the number of specializations retrieved from the database matches the number of IDs the user provided.
      //This is important to ensure that all requested specializations are valid.
      if (newSpecializationIds.length !== data.specializationIds.length) {
        return { error: "One or more specialization were not found" };
      }

      //This line retrieves the IDs of the specializations currently associated with the doctor.
      const existingSpecializationIds = doctor.specializations.map(
        (spe) => spe.id
      );

      //This filter step identifies specializations that are new and not already associated with the doctor
      const uniqueNewSpecializations = newSpecializationIds.filter(
        (spe) => !existingSpecializationIds.includes(spe.id)
      );

      //updates the specializations property of the doctor object.
      doctor.specializations = [
        ...doctor.specializations,
        ...uniqueNewSpecializations,
      ];

      await this.doctorRepo.save(doctor);

      return { message: "Specializations added successfully!" };
    } catch (error) {
      console.error("Error during add specializations to dr", error);
      return { error: "An unexpected error occurred" };
    }
  }

  async removeDrSpecialization(
    specializationId: number,
    doctorId: number
  ): Promise<{ error?: string; message?: string }> {
    try {
      const specialization = await this.specializationRepo.findOne({
        where: { id: specializationId },
      });
      if (!specialization) {
        return { error: "Specialization not found!" };
      }

      const doctor = await this.doctorRepo.findOne({
        where: { id: doctorId },
        relations: ["specializations"],
      });
      if (!doctor) {
        return { error: "Doctor not found!" };
      }

      const specializationToRemove = doctor.specializations.find(
        (spe) => spe.id === specializationId
      );

      if (!specializationToRemove) {
        return { error: "doctor has not this specialization!" };
      }

      //creates a new array that contains only those specialization objects whose IDs do not match the given specializationId.
      doctor.specializations = doctor.specializations.filter(
        (spe) => spe.id !== specializationId
      );

      await this.doctorRepo.save(doctor);

      return { message: "Specialization deleted successfully from doctor" };
    } catch (error) {
      console.error("Error during removing specialization from doctor", error);
      return { error: "An unexpected error occured" };
    }
  }
}
