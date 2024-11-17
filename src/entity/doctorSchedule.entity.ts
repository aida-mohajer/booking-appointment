import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Doctor } from "./doctor.entity";
import { Base } from "./base.entity";
import { Hospital } from "./hospital.entity";

@Entity({ name: "doctor_schedule" })
export class DoctorSchedule extends Base {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ nullable: false })
  doctorId!: number;

  @Column({ nullable: false })
  hospitalId!: number;

  @Column({ nullable: false })
  weekDay!: string;

  @Column({ nullable: false })
  startTime!: string;

  @Column({ nullable: false })
  endTime!: string;

  @Column({ nullable: false })
  duration!: number;

  @Column({ nullable: false })
  startDate!: string;

  @Column({ nullable: false })
  endDate!: string;

  // @Column({ nullable: false, default: "Available" })
  // status!: "Available" | "IsBooked" | "Canceled";

  @ManyToOne(() => Doctor, (doctor) => doctor.doctorsSchedule, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "doctorId" })
  doctor!: Doctor;

  @ManyToOne(() => Hospital, (hospital) => hospital.doctorsSchedule, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "hospitalId" })
  hospital!: Hospital;
}
