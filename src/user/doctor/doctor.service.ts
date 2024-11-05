import { EntityManager } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Encrypt } from "../../helper/encrypt";
import { Doctor } from "../../entity/doctor.entity";
import { RegisterDrDto } from "./dto/register-dr.dto";
import { LoginDrDto } from "./dto/login-dr.dto";
import { ReadLoginDrDto } from "./dto/read-login-dr.dto";
import { UpdateDrDto } from "./dto/update-dr.dto";
import { ReadGetDrDto } from "./dto/read-get-dr.dto";
import { ReadGetAllDrsDto } from "./dto/read-getall-drs.dto";
import { Image } from "../../entity/image.entity";
import path from "path";
import fs from "fs";
import { Pagination } from "../../middlewares/pagination";
import { Search } from "../../middlewares/search";
import { RefreshTokenService } from "../../refreshToken/refresh-token";
import { RefreshToken } from "../../entity/refresh_token.entity";
import { City } from "../../entity/city.entity";
// import { TokenBlacklistService } from "../../token-blacklist.service";

// const tokenBlacklistService = new TokenBlacklistService();

export class DoctorService {
  constructor(
    private doctorRepo = AppDataSource.getRepository(Doctor),
    private imageRepo = AppDataSource.getRepository(Image),
    private refreshTokenRepo = AppDataSource.getRepository(RefreshToken),
    private cityRepo = AppDataSource.getRepository(City)
  ) {}
  async registerDr(
    data: RegisterDrDto
  ): Promise<{ message?: string; error?: string }> {
    try {
      const existEmail = await this.doctorRepo.findOne({
        where: { email: data.email },
      });

      if (existEmail) {
        return { error: "Email already exists" };
      }

      const existHIN = await this.doctorRepo.findOne({
        where: { HIN: data.HIN },
      });

      if (existHIN) {
        return { error: "HIN already exists" };
      }

      const encryptedPassword = await Encrypt.encryptPass(data.password);

      const doctor = this.doctorRepo.create({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: encryptedPassword,
        contactNumber: data.contactNumber,
        bio: data.bio,
        HIN: data.HIN,
        degree: data.degree,
        address: data.address,
        rating: 0,
        cityId: data.cityId,
      });

      await this.doctorRepo.save(doctor);

      return {
        message: "Doctor registered successfully",
      };
    } catch (error) {
      console.error("Error during register doctor:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async drLogin(data: LoginDrDto): Promise<ReadLoginDrDto> {
    try {
      const doctor = await this.doctorRepo.findOne({
        where: { email: data.email },
      });
      if (!doctor) {
        return { error: "Doctor not found" };
      }
      const isPasswordValid = await Encrypt.comparePassword(
        data.password,
        doctor.password
      );

      const dto = new ReadLoginDrDto();
      if (isPasswordValid) {
        const accessToken = Encrypt.generateAccessToken({
          id: doctor.id,
          role: doctor.role,
        });

        const refreshToken = RefreshTokenService.generateRefreshToken({
          id: doctor.id,
          role: doctor.role,
        });

        const newRefreshToken = this.refreshTokenRepo.create({
          doctor,
          token: refreshToken,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set expiration time (30 days)
        });
        await this.refreshTokenRepo.save(newRefreshToken);

        dto.accessToken = accessToken;
        dto.refreshToke = refreshToken;
        dto.role = doctor.role;
        dto.message = "Doctor logged in successfully";
        return dto;
      } else {
        return { error: "Password is incorrect" };
      }
    } catch (error) {
      console.error("Error during login doctor:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async getDrs(
    pagination: Pagination,
    search?: Search,
    sortBy?: string,
    city?: string,
    specializations?: string[]
  ): Promise<ReadGetAllDrsDto> {
    const { skip, limit } = pagination;
    const { name = "" } = search || {};

    try {
      const doctorsQuery = this.doctorRepo
        .createQueryBuilder("doctor")
        .leftJoinAndSelect("doctor.image", "image")
        .leftJoinAndSelect("doctor.city", "city")
        .leftJoinAndSelect("doctor.specializations", "specializations");

      //filter specializations
      if (specializations && specializations.length > 0) {
        doctorsQuery.andWhere(
          "specializations.value IN (:...specializations)",
          {
            specializations,
          }
        );
      }
      // Add search filter
      if (name) {
        doctorsQuery.andWhere(
          "(LOWER(doctor.name) LIKE LOWER(:name) OR LOWER(doctor.lastName) LIKE LOWER(:lastName))",
          {
            name: `%${name}%`,
            lastName: `%${name}%`,
          }
        );
      }

      if (city) {
        doctorsQuery.andWhere("city.value = :city", { city });
      }

      // Apply sorting if provided
      if (sortBy) {
        const sortOptions: { [key: string]: "ASC" | "DESC" } = {
          oldest: "ASC",
          newest: "DESC",
          highestRated: "DESC",
          lowestRated: "ASC",
        };

        if (sortOptions[sortBy]) {
          doctorsQuery.orderBy(
            `doctor.${
              sortBy === "oldest"
                ? "createdAt"
                : sortBy === "newest"
                ? "createdAt"
                : "rating"
            }`,
            sortOptions[sortBy]
          );
        }
      } else {
        // Default sorting by rating if no sort option is specified
        doctorsQuery.orderBy("doctor.rating", "DESC");
      }

      const totalDoctors = await doctorsQuery.getCount();

      // Apply pagination
      const allDoctors = await doctorsQuery.skip(skip).take(limit).getMany();
      const totalPages = Math.ceil(totalDoctors / limit);

      // Format the response
      const formattedDoctors = allDoctors.map((doctor) => ({
        id: doctor.id,
        name: doctor.name,
        rating: doctor.rating,
        lastName: doctor.lastName,
        degree: doctor.degree,
        city: doctor.city ? doctor.city.value : "",
        imageName: doctor.image?.imageName || null,
        specializations:
          doctor.specializations.map((spe) => ({ value: spe.value })) || [],
      }));

      return {
        message:
          totalDoctors > 0
            ? "Doctors retrieved successfully"
            : "No doctor found matching the search criteria.",
        response: formattedDoctors,
        totalPages,
        totalDoctors,
      };
    } catch (error) {
      console.error("Error during retrieve doctors:", error);
      return { error: "An unexpected error occurred" };
    }
  }

  async getDr(doctorId: number): Promise<ReadGetDrDto> {
    try {
      const doctor = await this.doctorRepo
        .createQueryBuilder("doctor")
        .leftJoinAndSelect("doctor.image", "image")
        .leftJoinAndSelect("doctor.city", "city")
        .leftJoinAndSelect("doctor.specializations", "specializations")
        .select([
          "doctor.id",
          "doctor.name",
          "doctor.lastName",
          "doctor.degree",
          "doctor.address",
          "doctor.HIN",
          "doctor.bio",
          "doctor.city",
          "doctor.rating",
          "image.imageName",
          "doctor.specializations",
        ])
        .where("doctor.id = :doctorId", { doctorId })
        .getOne();

      if (!doctor) {
        return { error: "Doctor not found" };
      }
      return doctor;
    } catch (error) {
      console.error("Error during retrieve doctor:", error);
      return { error: "An unexpected error occurred" };
    }
  }

  async getMyProfile(doctorId: number): Promise<ReadGetDrDto> {
    try {
      const doctor = await this.doctorRepo
        .createQueryBuilder("doctor")
        .leftJoinAndSelect("doctor.image", "image")
        .leftJoinAndSelect("doctor.specializations", "specializations")
        .select([
          "doctor.id",
          "doctor.name",
          "doctor.lastName",
          "doctor.address",
          "doctor.email",
          "doctor.bio",
          "doctor.HIN",
          "doctor.contactNumber",
          "doctor.degree",
          "doctor.city",
          "image.imageName",
          "doctor.specializations",
        ])
        .where("doctor.id = :doctorId", { doctorId })
        .getOne();

      if (!doctor) {
        return { error: "Doctor not found" };
      }
      return doctor;
    } catch (error) {
      console.error("Error during retrieve doctor:", error);
      return { error: "An unexpected error occurred" };
    }
  }

  async updateDr(
    doctorId: number,
    data: UpdateDrDto
  ): Promise<{ message?: string; error?: string }> {
    try {
      const doctor = await this.doctorRepo.findOne({
        where: { id: doctorId },
      });

      if (!doctor) {
        return { error: "Doctor not found" };
      }

      Object.assign(doctor, data);
      if (data.password) {
        doctor.password = await Encrypt.encryptPass(data.password);
      }
      await this.doctorRepo.save(doctor);

      return {
        message: "Doctor info updated successfully",
      };
    } catch (error) {
      console.error("Error during updating doctor info:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async logoutDr(
    doctorId: number
  ): Promise<{ message?: string; error?: string }> {
    try {
      const refreshToken = await this.refreshTokenRepo.findOne({
        where: { doctorId: doctorId },
      });
      if (!refreshToken) {
        return { error: "Refresh token not found" };
      }
      await this.refreshTokenRepo.remove(refreshToken);

      return { message: "Doctor logged out successfully" };
    } catch (error) {
      console.error("Error during logout doctor info:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async removeDr(
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

          const existingImage = await this.imageRepo.findOne({
            where: { doctorId: doctorId },
          });

          if (existingImage) {
            const imagePath = path.join(
              __dirname,
              "../../images",
              existingImage.imageName
            );
            if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
            }
          }

          // await transactionalEntityManager.update(
          //   Order,
          //   { userId },
          //   { userId: null }
          // );

          await transactionalEntityManager.delete(Image, {
            doctorId: doctorId,
          });

          const refreshToken = await this.refreshTokenRepo.findOne({
            where: { doctorId: doctorId },
          });
          if (!refreshToken) {
            return { error: "Refresh token not found" };
          }
          await this.refreshTokenRepo.remove(refreshToken);

          await transactionalEntityManager.delete(Doctor, { id: doctorId });

          return { message: "Doctor removed successfully" };
        } catch (error) {
          console.error("Error during remove doctor:", error);
          return { error: "An unexpected error occurred" };
        }
      }
    );
  }
}
