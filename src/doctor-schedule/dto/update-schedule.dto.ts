import { IsIn, IsInt, IsNumber, IsOptional, Matches } from "class-validator";
import { IsCustomDateString } from "../decorators/custom-date.decorator.";

export class UpdateScheduleDto {
  @IsOptional()
  @IsIn([
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ])
  weekDay?: string;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "time must be in the format HH:mm",
  })
  startTime?: string;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "time must be in the format HH:mm",
  })
  endTime?: string;

  @IsOptional()
  @IsCustomDateString()
  startDate?: string;

  @IsOptional()
  @IsCustomDateString()
  endDate?: string;

  @IsOptional()
  @IsInt()
  duration?: number;

  @IsOptional()
  @IsNumber()
  price?: number;
}
