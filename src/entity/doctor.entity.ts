import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Base } from "./base.entity";
import { Feedback } from "./feedback.entity";
import { Image } from "./image.entity";
import { Appointment } from "./appointment.entity";
import { RefreshToken } from "./refresh_token.entity";
import { Specialization } from "./specialization.entity";
import { City } from "./city.entity";
import { Hospital } from "./hospital.entity";
import { DoctorSchedule } from "./doctorSchedule.entity";
import { DrExceptions } from "./drExceptions.entity";
// import { Payment } from "./payment.entities";
import { DoctorWallet } from "./doctor-wallet.entity";

@Entity({ name: "doctor" })
export class Doctor extends Base {
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
  contactNumber!: string;

  @Column({ nullable: false, unique: true })
  HIN!: number;

  @Column({ nullable: true })
  bio!: string;

  @Column({ nullable: false })
  degree!: string;

  @Column({ nullable: false })
  address!: string;

  @Column({ nullable: false })
  rating!: number;

  @Column({ nullable: false, default: "doctor" })
  role!: string;

  @Column({ nullable: false })
  cityId!: number;

  @OneToOne(() => Image, (image) => image.doctor, { cascade: true })
  image!: Image;

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.doctorId)
  refreshToken!: RefreshToken;

  @OneToOne(() => DoctorWallet, (wallet) => wallet.doctor)
  wallet!: DoctorWallet;

  @OneToMany(() => Feedback, (feedback) => feedback.doctor)
  feedbacks!: Feedback[];

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments!: Appointment[];

  @OneToMany(() => DoctorSchedule, (doctorSchedule) => doctorSchedule.doctor)
  doctorsSchedule!: DoctorSchedule[];

  @OneToMany(() => DrExceptions, (drExceptions) => drExceptions.doctor)
  drExceptions!: DrExceptions[];

  // @OneToMany(() => Payment, (payment) => payment.doctor)
  // payments!: Payment[];

  @ManyToMany(
    () => Specialization,
    (specialization) => specialization.doctors,
    {
      cascade: true,
      onDelete: "CASCADE",
    }
  )
  @JoinTable({ name: "doctors_specializations" })
  specializations!: Specialization[];

  @ManyToMany(() => Hospital, (hospital) => hospital.doctors, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinTable({ name: "doctors_hospitals" })
  hospitals!: Hospital[];

  @ManyToOne(() => City, (city) => city.doctors, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "cityId" })
  city!: City;
}
