import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateSpecializationDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(
    [
      "Dermatology",
      "Family medicine",
      "Cardiology",
      "Allergist",
      "Endocrinologist",
    ],
    {
      each: true,
    }
  )
  value!: string;
}
