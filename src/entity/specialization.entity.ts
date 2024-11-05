import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./doctor.entity";
import { Base } from "./base.entity";

@Entity({ name: "specialization" })
export class Specialization extends Base {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ nullable: false, unique: true })
  value!: string;

  @ManyToMany(() => Doctor, (doctor) => doctor.specializations)
  doctors!: Doctor[];
}
