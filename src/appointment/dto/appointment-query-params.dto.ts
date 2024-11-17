import { IsOptional } from "class-validator";
import { IsCustomDateString } from "../../doctor-schedule/decorators/custom-date.decorator.";

export class AppointmentQueryParamsDto {
  @IsOptional()
  @IsCustomDateString()
  startDate!: string;

  @IsOptional()
  @IsCustomDateString()
  endDate!: string;
}
