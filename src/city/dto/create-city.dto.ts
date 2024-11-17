import { IsNotEmpty, IsString } from "class-validator";

export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  value!: string;
}
