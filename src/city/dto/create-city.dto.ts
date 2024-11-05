import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(["Tehran", "Shiraz", "Karaj"])
  value!: string;
}
