import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Base } from "./base.entity";
import { Doctor } from "./doctor.entity";
import { Appointment } from "./appointment.entity";
import { DoctorSchedule } from "./doctorSchedule.entity";
import { DrExceptions } from "./drExceptions.entity";

@Entity({ name: "hospital" })
export class Hospital extends Base {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  location!: string;

  @Column({ nullable: false })
  contactNumber!: string;

  @Column({ nullable: false })
  email!: string;

  @ManyToMany(() => Doctor, (doctor) => doctor.hospitals)
  doctors!: Doctor[];

  @OneToMany(() => DoctorSchedule, (doctorSchedule) => doctorSchedule.hospital)
  doctorsSchedule!: DoctorSchedule[];

  @OneToMany(() => Appointment, (appointment) => appointment.hospital)
  appointments!: Appointment[];

  @OneToMany(() => DrExceptions, (drExceptions) => drExceptions.hospital)
  drExceptions!: DrExceptions[];
}
