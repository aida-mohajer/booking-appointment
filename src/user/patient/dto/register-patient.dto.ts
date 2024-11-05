import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
} from "class-validator";

export class RegisterPatientDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  // @Min(8)
  @IsNotEmpty()
  @IsString()
  password!: string;

  // @IsPhoneNumber(null, { message: "Invalid contact number format." })
  @IsNotEmpty()
  @IsString()
  contactNumber!: string;

  @Max(100)
  @Min(18)
  @IsNotEmpty()
  @IsNumber()
  age!: number;

  @IsIn(["man", "woman"])
  @IsNotEmpty()
  @IsString()
  gender!: string;
}
