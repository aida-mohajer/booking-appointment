import { ArrayNotEmpty, IsArray, IsNumber, IsString } from "class-validator";

export class AddSpecializationIdsToDrDto {
  @IsArray({ message: "specializationIds must be an array" })
  @ArrayNotEmpty({ message: "specializations should not be empty" })
  @IsNumber({}, { each: true, message: "Each specialization must be a number" })
  specializationIds!: number[];
}
