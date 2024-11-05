import { EntityManager } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Patient } from "../../entity/patient.entity";
import { Encrypt } from "../../helper/encrypt";
import { LoginPatientDto } from "./dto/login-patient.dto";
import { ReadLoginPatientDto } from "./dto/read-login-patient.dto";
import { RegisterPatientDto } from "./dto/register-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { ReadGetPatientDto } from "./dto/read-get-patient.dto";
import { Doctor } from "../../entity/doctor.entity";
import { ReadGetAllPatientsDto } from "./dto/read-getall-patients.dto";
import { RefreshTokenService } from "../../refreshToken/refresh-token";
import { RefreshToken } from "../../entity/refresh_token.entity";
import { Pagination } from "../../middlewares/pagination";
import { log } from "console";
import { Search } from "../../middlewares/search";

export class PatientService {
  constructor(
    private patientRepo = AppDataSource.getRepository(Patient),
    private drRepo = AppDataSource.getRepository(Doctor),
    private refreshTokenRepo = AppDataSource.getRepository(RefreshToken)
  ) {}
  async registerPatient(
    data: RegisterPatientDto
  ): Promise<{ message?: string; error?: string }> {
    try {
      const existEmail = await this.patientRepo.findOne({
        where: { email: data.email },
      });

      if (existEmail) {
        return { error: "Email already exists" };
      }

      const encryptedPassword = await Encrypt.encryptPass(data.password);

      const patient = this.patientRepo.create({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: encryptedPassword,
        contactNumber: data.contactNumber,
        age: data.age,
        gender: data.gender,
      });

      await this.patientRepo.save(patient);

      return {
        message: "Patient registered successfully",
      };
    } catch (error) {
      console.error("Error during register patient", error);
      return { error: " An unexpected error occured" };
    }
  }

  async patientLogin(data: LoginPatientDto): Promise<ReadLoginPatientDto> {
    try {
      const patient = await this.patientRepo.findOne({
        where: { email: data.email },
      });
      if (!patient) {
        return { error: "Patient not found" };
      }

      const isLogin = await this.refreshTokenRepo.findOne({
        where: { patientId: patient.id },
      });
      if (isLogin) {
        return { error: "Patient is already logged in" };
      }

      const isPasswordValid = await Encrypt.comparePassword(
        data.password,
        patient.password
      );

      const dto = new ReadLoginPatientDto();
      if (isPasswordValid) {
        const accessToken = Encrypt.generateAccessToken({
          id: patient.id,
          role: patient.role,
        });

        const refreshToken = RefreshTokenService.generateRefreshToken({
          id: patient.id,
          role: patient.role,
        });

        // Save the refresh token in the database
        const newRefreshToken = this.refreshTokenRepo.create({
          patient,
          token: refreshToken,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set expiration time (30 days)
        });
        await this.refreshTokenRepo.save(newRefreshToken);

        dto.accessToken = accessToken;
        dto.refreshToken = refreshToken;
        dto.role = patient.role;
        dto.message = "Patient logged in successfully";
        return dto;
      } else {
        return { error: "Password is incorrect" };
      }
    } catch (error) {
      console.error("Error during login patient", error);
      return { error: " An unexpected error occured" };
    }
  }

  async getMyProfile(patientId: number): Promise<ReadGetPatientDto> {
    try {
      const patient = await this.patientRepo.findOne({
        where: { id: patientId },
      });
      if (!patient) {
        return { error: "Patient not found" };
      }
      return {
        name: patient.name,
        lastName: patient.lastName,
        contactNumber: patient.contactNumber,
        age: patient.age,
        email: patient.email,
        gender: patient.gender,
      };
    } catch (error) {
      console.error("Error during retrieve patient", error);
      return { error: " An unexpected error occured" };
    }
  }

  //get patients of dr in a year,month or day for history
  //the year is mandatory here for filtering
  //patients info and their appointments
  //Note: this endpoint isnt for counting patients or appointments in a date,check the appointment module,it is just for get patients info
  async getDrPatients(
    doctorId: number,
    pagination: Pagination,
    year?: number,
    search?: Search,
    month?: number,
    day?: number
  ): Promise<ReadGetAllPatientsDto> {
    const { skip, limit } = pagination;
    const { name = "" } = search || {};

    try {
      const doctor = await this.drRepo.findOne({
        where: { id: doctorId },
      });
      if (!doctor) {
        return { error: "Doctor not found" };
      }

      let queryBuilder = this.patientRepo
        .createQueryBuilder("patient")
        .leftJoinAndSelect("patient.appointments", "appointment")
        .leftJoinAndSelect("appointment.availability", "availability")
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
        .where("appointment.doctorId = :doctorId", { doctorId });

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

      // Add search filter
      if (name) {
        queryBuilder.andWhere(
          "(LOWER(patient.name) LIKE LOWER(:name) OR LOWER(patient.lastName) LIKE LOWER(:lastName))",
          {
            name: `%${name}%`,
            lastName: `%${name}%`,
          }
        );
      }

      const totalPatients = await queryBuilder.getCount();

      // Apply pagination
      const allPatients = await queryBuilder
        .orderBy("patient.name", "ASC")
        .skip(skip)
        .take(limit)
        .getMany();

      const totalPages = Math.ceil(totalPatients / limit);
      return {
        message:
          totalPatients > 0
            ? "Patients retrieved successfully"
            : "No patient found matching the search criteria.",
        response: allPatients,
        totalPages,
        totalPatients,
      };
    } catch (error) {
      console.error("Error during retrieve patients", error);
      return { error: " An unexpected error occured" };
    }
  }

  async updatePatient(
    patientId: number,
    data: UpdatePatientDto
  ): Promise<{ message?: string; error?: string }> {
    try {
      const patient = await this.patientRepo.findOne({
        where: { id: patientId },
      });

      if (!patient) {
        return { error: "Patient not found" };
      }

      Object.assign(patient, data);
      if (data.password) {
        patient.password = await Encrypt.encryptPass(data.password);
      }

      await this.patientRepo.save(patient);

      return {
        message: "Patient info updated successfully",
      };
    } catch (error) {
      console.error("Error during updating patient info", error);
      return { error: " An unexpected error occured" };
    }
  }

  async logoutPatient(
    patientId: number
  ): Promise<{ message?: string; error?: string }> {
    try {
      const refreshToken = await this.refreshTokenRepo.findOne({
        where: { patientId: patientId },
      });
      if (!refreshToken) {
        return { error: "Refresh token not found" };
      }
      await this.refreshTokenRepo.remove(refreshToken);

      return { message: "Patient logged out successfully" };
    } catch (error) {
      console.error("Error during logout patient info:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async removePatient(
    patientId: number
  ): Promise<{ error?: string; message?: string }> {
    const entityManager = AppDataSource.createEntityManager();

    return await entityManager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const patient = await transactionalEntityManager.findOne(Patient, {
            where: { id: patientId },
          });
          if (!patient) {
            return { error: "Patient not found" };
          }

          // await transactionalEntityManager.update(
          //   Order,
          //   { userId },
          //   { userId: null }
          // );

          const refreshToken = await transactionalEntityManager.findOne(
            RefreshToken,
            {
              where: { patientId: patientId },
            }
          );
          if (!refreshToken) {
            return { error: "Refresh token not found" };
          }
          await transactionalEntityManager.remove(refreshToken);

          await transactionalEntityManager.delete(Patient, { id: patientId });

          return { message: "Patient removed successfully" };
        } catch (error) {
          console.error("Error during remove patient:", error);
          return { error: "An unexpected error occurred" };
        }
      }
    );
  }
}
