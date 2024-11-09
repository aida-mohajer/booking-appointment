import { IsOptional } from "class-validator";
import { IsCustomDateString } from "../../availability/decorators/custom-date.decorator.";

export class AppointmentQueryParamsDto {
  @IsOptional()
  @IsCustomDateString()
  startDate!: Date;

  @IsOptional()
  @IsCustomDateString()
  endDate!: Date;
}
