import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Doctor } from "./doctor.entity";
import { Patient } from "./patient.entity";
import { Admin } from "./admin.entity";

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ nullable: false })
  token!: string;

  @Column({ nullable: true })
  doctorId!: number;

  @Column({ nullable: true })
  patientId!: number;

  @Column({ nullable: true })
  adminId!: number;

  @Column()
  expiresAt!: Date;

  @OneToOne(() => Doctor, (doctor) => doctor.refreshToken)
  @JoinColumn({ name: "doctorId" })
  doctor!: Doctor;

  @OneToOne(() => Patient, (patient) => patient.refreshToken)
  @JoinColumn({ name: "patientId" })
  patient!: Patient;

  @OneToOne(() => Admin, (admin) => admin.refreshToken)
  @JoinColumn({ name: "adminId" })
  admin!: Admin;
}
