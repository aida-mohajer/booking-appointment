import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Base } from "./base.entity";
import { Doctor } from "./doctor.entity";

@Entity({ name: "image" })
export class Image extends Base {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ nullable: false })
  imageName!: string;

  @Column({ nullable: true })
  doctorId!: number;

  @OneToOne(() => Doctor, (doctor) => doctor.image)
  @JoinColumn({ name: "doctorId" })
  doctor!: Doctor;
}
