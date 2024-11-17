import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Base } from "./base.entity";
import { Doctor } from "./doctor.entity";
import { Patient } from "./patient.entity";
import { Hospital } from "./hospital.entity";

@Entity({ name: "appointment" })
export class Appointment extends Base {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ nullable: false })
  doctorId!: number;

  @Column({ nullable: true })
  patientId!: number;

  @Column({ nullable: true })
  hospitalId!: number;

  @Column({ nullable: true })
  appointmentDate!: string;

  @Column({ nullable: true })
  time!: string;

  @ManyToOne(() => Patient, (patient) => patient.appointments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "patientId" })
  patient!: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "doctorId" })
  doctor!: Doctor;

  @ManyToOne(() => Hospital, (hospital) => hospital.appointments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "hospitalId" })
  hospital!: Hospital;
}
