import "reflect-metadata";
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Patient } from "./entity/patient.entity";
import { Doctor } from "./entity/doctor.entity";
import { Base } from "./entity/base.entity";
import { Feedback } from "./entity/feedback.entity";
import { Image } from "./entity/image.entity";
import { Appointment } from "./entity/appointment.entity";
import { Admin } from "./entity/admin.entity";
import { RefreshToken } from "./entity/refresh_token.entity";
import { Specialization } from "./entity/specialization.entity";
import { City } from "./entity/city.entity";
import { Hospital } from "./entity/hospital.entity";
import { DoctorSchedule } from "./entity/doctorSchedule.entity";
import { DrExceptions } from "./entity/drExceptions.entity";
import { PatientWallet } from "./entity/patient-wallet.entity";
import { DoctorWallet } from "./entity/doctor-wallet.entity";
import { Transaction } from "./entity/transaction.entity";

dotenv.config();

const secret = process.env.JWT_SECRET;

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: "mssql",
  host: DB_HOST,
  port: parseInt(DB_PORT || "1433"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,

  synchronize: true,
  logging: NODE_ENV === "dev",
  // logging: true,
  entities: [
    Patient,
    Doctor,
    Base,
    Feedback,
    Image,
    DoctorSchedule,
    Appointment,
    Admin,
    RefreshToken,
    Specialization,
    City,
    Hospital,
    DrExceptions,
    DoctorWallet,
    PatientWallet,
    Transaction,
  ],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
  options: {
    encrypt: false,
  },
  extra: {
    requestTimeout: 60000,
  },
});
