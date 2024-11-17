import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Base } from "./base.entity";
import { Doctor } from "./doctor.entity";
import { Hospital } from "./hospital.entity";

@Entity({ name: "dr_exceptions" })
export class DrExceptions extends Base {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  doctorId!: number;

  @Column()
  hospitalId!: number;

  @Column()
  startDate!: string;

  @Column()
  endDate!: string;

  @Column()
  startTime!: string;

  @Column()
  endTime!: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.drExceptions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "doctorId" })
  doctor!: Doctor;

  @ManyToOne(() => Hospital, (hospital) => hospital.drExceptions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "hospitalId" })
  hospital!: Hospital;
}
