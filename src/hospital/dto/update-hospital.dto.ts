import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateHospitalDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  contactNumber?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
