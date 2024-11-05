import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./doctor.entity";
import { Base } from "./base.entity";

@Entity({ name: "city" })
export class City extends Base {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ nullable: false, unique: true })
  value!: string;

  @OneToMany(() => Doctor, (doctor) => doctor.city)
  doctors!: Doctor[];
}
