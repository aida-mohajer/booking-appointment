import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Base } from "./base.entity";
import { Patient } from "./patient.entity";
import { Doctor } from "./doctor.entity";

@Entity({ name: "feedback" })
export class Feedback extends Base {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ nullable: false })
  patientId!: number;

  @Column({ nullable: false })
  doctorId!: number;

  @Column({ nullable: false })
  rating!: number;

  @Column({ nullable: false })
  comment!: string;

  @ManyToOne(() => Patient, (patient) => patient.feedbacks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "patientId" })
  patient!: Patient;

  @ManyToOne(() => Doctor, (Doctor) => Doctor.feedbacks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "doctorId" })
  doctor!: Doctor;
}
