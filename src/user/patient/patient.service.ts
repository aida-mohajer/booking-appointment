import { EntityManager } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Patient } from "../../entity/patient.entity";
import { Encrypt } from "../../helper/encrypt";
import { LoginPatientDto } from "./dto/login-patient.dto";
import { ReadLoginPatientDto } from "./dto/read-login-patient.dto";
import { RegisterPatientDto } from "./dto/register-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { ReadGetPatientDto } from "./dto/read-get-patient.dto";
import { RefreshTokenService } from "../../refreshToken/refresh-token";
import { RefreshToken } from "../../entity/refresh_token.entity";

export class PatientService {
  constructor(
    private patientRepo = AppDataSource.getRepository(Patient),
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

  async getProfile(patientId: number): Promise<ReadGetPatientDto> {
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
      const patient = await this.patientRepo.findOne({
        where: { id: patientId },
      });

      if (!patient) {
        return { error: "Patient not found" };
      }

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
