import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Patient } from "./patient.entity";
// import { Transaction } from "./transaction.entity";

@Entity({ name: "patient_wallet" })
export class PatientWallet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  balance!: number;

  @Column()
  patientId!: number;

  @OneToOne(() => Patient, (patient) => patient.wallet, { onDelete: "CASCADE" })
  @JoinColumn({ name: "patientId" })
  patient!: Patient;

  // @OneToMany(() => Transaction, (transaction) => transaction.patientWallet)
  // transactions!: Transaction[];
}
