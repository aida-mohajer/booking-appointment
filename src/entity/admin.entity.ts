import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.entity";
import { RefreshToken } from "./refresh_token.entity";

@Entity({ name: "admin" })
export class Admin extends Base {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  name!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: false, default: "admin" })
  role!: string;

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.adminId, {
    onDelete: "CASCADE",
  })
  refreshToken!: RefreshToken;
}
