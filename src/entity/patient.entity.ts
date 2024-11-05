import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Base } from "./base.entity";
import { Feedback } from "./feedback.entity";
import { Appointment } from "./appointment.entity";
import { RefreshToken } from "./refresh_token.entity";

@Entity({ name: "patient" })
export class Patient extends Base {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ nullable: false })
  age!: number;

  @Column({ nullable: false })
  contactNumber!: string;

  @Column({ nullable: false })
  gender!: string;

  @Column({ nullable: false, default: "patient" })
  role!: string;

  @OneToMany(() => Feedback, (feedback) => feedback.patient)
  feedbacks!: Feedback[];

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments!: Appointment[];

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.patientId)
  refreshToken!: RefreshToken;
}
