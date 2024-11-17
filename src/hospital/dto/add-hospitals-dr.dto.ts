import { ArrayNotEmpty, IsArray, IsNumber } from "class-validator";

export class AddHospitalIdsToDrDto {
  @IsArray({ message: "hospitalIds must be an array" })
  @ArrayNotEmpty({ message: "hospitals should not be empty" })
  @IsNumber({}, { each: true, message: "Each hospital must be a number" })
  hospitalIds!: number[];
}
