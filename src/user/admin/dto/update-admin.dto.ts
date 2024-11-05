import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateAdminDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  // @Min(8)
  @IsString()
  @IsOptional()
  password?: string;
}
