import { In } from "typeorm";
import { AppDataSource } from "../data-source";
import { Doctor } from "../entity/doctor.entity";
import { Hospital } from "../entity/hospital.entity";
import { CreateHospitalDto } from "./dto/create-hospital.dto";
import { ReadGetHospitalsDto } from "./dto/read-get-allHospitals.validations";
import { AddHospitalIdsToDrDto } from "./dto/add-hospitals-dr.dto";
import { UpdateHospitalDto } from "./dto/update-hospital.dto";

export class HospitalService {
  constructor(
    private hospitalRepo = AppDataSource.getRepository(Hospital),
    private doctorRepo = AppDataSource.getRepository(Doctor)
  ) {}
  async createHospital(
    data: CreateHospitalDto
  ): Promise<{ message?: string; error?: string }> {
    try {
      const existEmail = await this.hospitalRepo.findOne({
        where: { email: data.email },
      });

      if (existEmail) {
        return { error: "Email already exists" };
      }
      const hospital = this.hospitalRepo.create({
        name: data.name,
        location: data.location,
        contactNumber: data.contactNumber,
        email: data.email,
      });

      await this.hospitalRepo.save(hospital);

      return {
        message: "Hospital added successfully",
      };
    } catch (error) {
      console.error("Error during adding hospital:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async getHospitals(): Promise<ReadGetHospitalsDto> {
    try {
      const hospitals = await this.hospitalRepo.find({
        select: ["id", "location", "name", "contactNumber"],
      });

      return { response: hospitals };
    } catch (error) {
      console.error("Error during retrieve specializations:", error);
      return { error: "An unexpected error occurred" };
    }
  }

  async updateHospital(
    hospitalId: number,
    data: UpdateHospitalDto
  ): Promise<{ message?: string; error?: string }> {
    try {
      const hospital = await this.hospitalRepo.findOne({
        where: { id: hospitalId },
      });

      if (!hospital) {
        return { error: "Hospital not found" };
      }

      Object.assign(hospital, data);
      await this.hospitalRepo.save(hospital);

      return { message: "Hospital updated succeddfully" };
    } catch (error) {
      console.error("Error during update hospitals:", error);
      return { error: "An unexpected error occurred" };
    }
  }

  async removeHospital(
    hospitalId: number
  ): Promise<{ message?: string; error?: string }> {
    try {
      const hospital = await this.hospitalRepo.findOne({
        where: { id: hospitalId },
      });
      if (!hospital) {
        return { error: "Hospital not found" };
      }

      await this.hospitalRepo.remove(hospital);

      return {
        message: "Hospital removed successfully",
      };
    } catch (error) {
      console.error("Error during removing hospital:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async addHospitalToDr(
    doctorId: number,
    data: AddHospitalIdsToDrDto
  ): Promise<{ error?: string; message?: string }> {
    try {
      const doctor = await this.doctorRepo.findOne({
        where: { id: doctorId },
        relations: ["hospitals"],
      });
      if (!doctor) {
        return { error: "Doctor not found" };
      }

      // find hospitals based on the IDs provided by the user in data.hospitalIds.
      const newHospitalIds = await this.hospitalRepo.findBy({
        id: In(data.hospitalIds),
      });

      //This check ensures that the number of hospitals retrieved from the database matches the number of IDs the user provided.
      //This is important to ensure that all requested hospitalIds are valid.
      if (newHospitalIds.length !== data.hospitalIds.length) {
        return { error: "One or more hospital were not found" };
      }

      //This line retrieves the IDs of the hospitals currently associated with the doctor.
      const existingHospitalIds = doctor.hospitals.map((hos) => hos.id);

      //This filter step identifies hospitals that are new and not already associated with the doctor
      const uniqueNewHospitals = newHospitalIds.filter(
        (hos) => !existingHospitalIds.includes(hos.id)
      );

      //updates the hospitals property of the doctor object.
      doctor.hospitals = [...doctor.hospitals, ...uniqueNewHospitals];

      await this.doctorRepo.save(doctor);

      return { message: "Hospitals added successfully!" };
    } catch (error) {
      console.error("Error during add hospitals to dr", error);
      return { error: "An unexpected error occurred" };
    }
  }

  async removeDrHospital(
    hospitalId: number,
    doctorId: number
  ): Promise<{ error?: string; message?: string }> {
    try {
      const hospital = await this.hospitalRepo.findOne({
        where: { id: hospitalId },
      });
      if (!hospital) {
        return { error: "Hospital not found!" };
      }

      const doctor = await this.doctorRepo.findOne({
        where: { id: doctorId },
        relations: ["hospitals"],
      });
      if (!doctor) {
        return { error: "Doctor not found!" };
      }

      const hospitalsToRemove = doctor.hospitals.find(
        (hos) => hos.id === hospitalId
      );

      if (!hospitalsToRemove) {
        return { error: "doctor has not this hospital!" };
      }

      //creates a new array that contains only those hospitals objects whose IDs do not match the given hospitalIds.
      doctor.hospitals = doctor.hospitals.filter(
        (hos) => hos.id !== hospitalId
      );

      await this.doctorRepo.save(doctor);

      return { message: "Hospital deleted successfully from doctor" };
    } catch (error) {
      console.error("Error during removing hospital from doctor", error);
      return { error: "An unexpected error occured" };
    }
  }
}
