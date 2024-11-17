import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateHospitalDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  location!: string;

  @IsNotEmpty()
  @IsString()
  contactNumber!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
