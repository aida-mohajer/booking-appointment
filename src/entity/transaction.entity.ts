import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Patient } from "./patient.entity";
import { Doctor } from "./doctor.entity";

@Entity({ name: "transaction" })
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  balanceChange!: number;

  @Column()
  patientId!: number;

  @Column()
  doctorId!: number;

  @CreateDateColumn()
  timestamp!: Date;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: "patientId" })
  patient!: Patient;

  @ManyToOne(() => Doctor)
  @JoinColumn({ name: "doctorId" })
  doctor!: Doctor;

  @Column("varchar", { length: 255 })
  type!: string; // e.g., 'patient_balance_decreased', 'doctor_balance_increased'
}
