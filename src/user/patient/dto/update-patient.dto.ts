import {
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class UpdatePatientDto {
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

  // @IsPhoneNumber(null, { message: "Invalid contact number format." })
  @IsString()
  @IsOptional()
  contactNumber?: string;

  @Max(100)
  @Min(18)
  @IsNumber()
  @IsOptional()
  age?: number;

  @IsIn(["man", "women"])
  @IsString()
  @IsOptional()
  gender?: string;
}
