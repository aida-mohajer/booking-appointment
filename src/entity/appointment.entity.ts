import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Base } from "./base.entity";
import { Doctor } from "./doctor.entity";
import { Patient } from "./patient.entity";
import { Availability } from "./availability.entity";

@Entity({ name: "appointment" })
export class Appointment extends Base {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ nullable: false })
  doctorId!: number;

  @Column({ nullable: true })
  patientId!: number;

  @Column({ nullable: true })
  availabilityId!: number;

  @ManyToOne(() => Patient, (patient) => patient.appointments, {
    onDelete: "CASCADE",
  })
  patient!: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, {
    onDelete: "CASCADE",
  })
  doctor!: Doctor;

  @OneToOne(() => Availability, (availability) => availability.appointment)
  @JoinColumn({ name: "availabilityId" })
  availability!: Availability;
}
