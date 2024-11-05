import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator";

export class LoginDrDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  // @Min(8)
  @IsString()
  @IsNotEmpty()
  password!: string;
}
