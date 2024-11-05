import { IsIn, IsOptional, IsString } from "class-validator";

export class UpdateAppointmentDto {
  @IsIn(["canceled"])
  @IsString()
  @IsOptional()
  status?: string;
}
