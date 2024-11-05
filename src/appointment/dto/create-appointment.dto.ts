import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(["available", "booked"])
  status!: string;
}
