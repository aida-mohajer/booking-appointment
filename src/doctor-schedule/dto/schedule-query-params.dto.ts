import { IsOptional } from "class-validator";
import { IsCustomDateString } from "../decorators/custom-date.decorator.";

export class ScheduleQueryParamsDto {
  @IsOptional()
  @IsCustomDateString()
  date?: string;
}
