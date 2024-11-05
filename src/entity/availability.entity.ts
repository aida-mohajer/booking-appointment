import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Base } from "./base.entity";
import { Doctor } from "./doctor.entity";
import { Appointment } from "./appointment.entity";

@Entity({ name: "availability" })
export class Availability extends Base {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  doctorId!: number;

  @Column()
  availableDate!: string;

  @Column({ default: true })
  isAvailable!: boolean;

  @ManyToOne(() => Doctor, (doctor) => doctor.availability)
  @JoinColumn({ name: "doctorId" })
  doctor!: Doctor;

  @OneToOne(() => Appointment, (appointment) => appointment.availability, {
    onDelete: "CASCADE",
  })
  appointment!: Appointment;
}
