import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";

export class RegisterDrDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsString()
  contactNumber!: string;

  //ino dororst kon
  // @MaxLength(4)
  @IsNumber()
  @IsNotEmpty()
  HIN!: number;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsNotEmpty()
  @IsString()
  address!: string;

  @IsIn(["specialist", "super specialist"])
  @IsString()
  @IsNotEmpty()
  degree!: string;

  @IsNotEmpty()
  @IsNumber()
  cityId!: number;
}
