import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Doctor } from "./doctor.entity";
// import { Transaction } from "./transaction.entity";

@Entity({ name: "doctor_wallet" })
export class DoctorWallet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  balance!: number;

  @Column()
  doctorId!: number;

  @OneToOne(() => Doctor, (doctor) => doctor.wallet, { onDelete: "CASCADE" })
  @JoinColumn({ name: "doctorId" })
  doctor!: Doctor;

  // @OneToMany(() => Transaction, (transaction) => transaction.doctorWallet)
  // transactions!: Transaction[];
}
