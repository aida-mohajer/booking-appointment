import { EntityManager } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Encrypt } from "../../helper/encrypt";
import { RefreshTokenService } from "../../refreshToken/refresh-token";
import { RefreshToken } from "../../entity/refresh_token.entity";
import { RegisterAdminDto } from "./dto/register-admin.dto";
import { Admin } from "../../entity/admin.entity";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { ReadLoginAdminDto } from "./dto/read-login-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ReadGetAdminDto } from "./dto/read-get-admin.dto";

export class AdminService {
  constructor(
    private adminRepo = AppDataSource.getRepository(Admin),
    private refreshTokenRepo = AppDataSource.getRepository(RefreshToken)
  ) {}
  async registerAdmin(
    data: RegisterAdminDto
  ): Promise<{ message?: string; error?: string }> {
    try {
      const existEmail = await this.adminRepo.findOne({
        where: { email: data.email },
      });

      if (existEmail) {
        return { error: "Email already exists" };
      }

      const encryptedPassword = await Encrypt.encryptPass(data.password);

      const admin = this.adminRepo.create({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: encryptedPassword,
      });

      await this.adminRepo.save(admin);

      return {
        message: "Admin registered successfully",
      };
    } catch (error) {
      console.error("Error during register admin:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async adminLogin(data: LoginAdminDto): Promise<ReadLoginAdminDto> {
    try {
      const admin = await this.adminRepo.findOne({
        where: { email: data.email },
      });
      if (!admin) {
        return { error: "Admin not found" };
      }

      const isLogin = await this.refreshTokenRepo.findOne({
        where: { adminId: admin.id },
      });
      if (isLogin) {
        return { error: "Admin is already logged in" };
      }

      const isPasswordValid = await Encrypt.comparePassword(
        data.password,
        admin.password
      );

      const dto = new ReadLoginAdminDto();
      if (isPasswordValid) {
        const accessToken = Encrypt.generateAccessToken({
          id: admin.id,
          role: admin.role,
        });

        const refreshToken = RefreshTokenService.generateRefreshToken({
          id: admin.id,
          role: admin.role,
        });

        // Save the refresh token in the database
        const newRefreshToken = this.refreshTokenRepo.create({
          admin,
          token: refreshToken,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set expiration time (30 days)
        });
        await this.refreshTokenRepo.save(newRefreshToken);

        dto.accessToken = accessToken;
        dto.refreshToken = refreshToken;
        dto.role = admin.role;
        dto.message = "Admin logged in successfully";
        return dto;
      } else {
        return { error: "Password is incorrect" };
      }
    } catch (error) {
      console.error("Error during login admin:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async getAdminProfile(adminId: number): Promise<ReadGetAdminDto> {
    try {
      const admin = await this.adminRepo.findOne({
        where: { id: adminId },
      });
      if (!admin) {
        return { error: "Admin not found" };
      }
      return {
        name: admin.name,
        lastName: admin.lastName,
        email: admin.email,
        role: admin.role,
      };
    } catch (error) {
      console.error("Error during retrieve admin:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async getAdmins(): Promise<{ response?: Admin[]; error?: string }> {
    try {
      const admins = await this.adminRepo
        .createQueryBuilder("admin")
        .select(["admin.id", "admin.name", "admin.lastName", "admin.email"])
        .getMany();

      return {
        response: admins,
      };
    } catch (error) {
      console.error("Error during retrieve admins:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async updateAdmin(
    adminId: number,
    data: UpdateAdminDto
  ): Promise<{ message?: string; error?: string }> {
    try {
      const admin = await this.adminRepo.findOne({
        where: { id: adminId },
      });

      if (!admin) {
        return { error: "Admin not found" };
      }

      Object.assign(admin, data);
      if (data.password) {
        admin.password = await Encrypt.encryptPass(data.password);
      }

      await this.adminRepo.save(admin);

      return {
        message: "Admin info updated successfully",
      };
    } catch (error) {
      console.error("Error during updating admin info", error);
      return { error: " An unexpected error occured" };
    }
  }

  async logoutAdmin(
    adminId: number
  ): Promise<{ message?: string; error?: string }> {
    try {
      const admin = await this.adminRepo.findOne({
        where: { id: adminId },
      });

      if (!admin) {
        return { error: "Admin not found" };
      }
      const refreshToken = await this.refreshTokenRepo.findOne({
        where: { adminId: adminId },
      });
      if (!refreshToken) {
        return { error: "Refresh token not found" };
      }
      await this.refreshTokenRepo.remove(refreshToken);

      return { message: "Admin logged out successfully" };
    } catch (error) {
      console.error("Error during admin logout", error);
      return { error: " An unexpected error occured" };
    }
  }

  async removeAdmin(
    adminId: number
  ): Promise<{ error?: string; message?: string }> {
    const entityManager = AppDataSource.createEntityManager();

    return await entityManager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const admin = await transactionalEntityManager.findOne(Admin, {
            where: { id: adminId },
          });
          if (!admin) {
            return { error: "Admin not found" };
          }

          const refreshToken = await transactionalEntityManager.findOne(
            RefreshToken,
            {
              where: { adminId: adminId },
            }
          );
          if (!refreshToken) {
            return { error: "Refresh token not found" };
          }
          await transactionalEntityManager.remove(refreshToken);

          await transactionalEntityManager.delete(Admin, { id: adminId });

          return { message: "Admin removed successfully" };
        } catch (error) {
          console.error("Error during remove admin", error);
          return { error: "An unexpected error occurred" };
        }
      }
    );
  }
}
