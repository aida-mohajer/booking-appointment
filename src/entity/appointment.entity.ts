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
import { Hospital } from "./hospital.entity";
// import { Payment } from "./payment.entities";

@Entity({ name: "appointment" })
export class Appointment extends Base {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ nullable: false })
  doctorId!: number;

  @Column({ nullable: false })
  patientId!: number;

  @Column({ nullable: false })
  hospitalId!: number;

  @Column({ nullable: false })
  appointmentDate!: string;

  @Column({ nullable: false })
  time!: string;

  @Column({ nullable: true })
  price!: number;

  @Column({ nullable: false, default: "pending" }) //pending , confirmed, cancelled
  status!: string;

  @ManyToOne(() => Patient, (patient) => patient.appointments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "patientId" })
  patient!: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  @JoinColumn({ name: "doctorId" })
  doctor!: Doctor;

  @ManyToOne(() => Hospital, (hospital) => hospital.appointments)
  @JoinColumn({ name: "hospitalId" })
  hospital!: Hospital;

  // @OneToOne(() => Payment, (payment) => payment.appointment)
  // payment!: Payment;
}
