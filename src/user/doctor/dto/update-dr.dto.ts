import { IsEmail, IsIn, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDrDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  contactNumber?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsNumber()
  cityId?: number;
}
