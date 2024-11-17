import { IsIn, IsInt, IsNotEmpty, Matches } from "class-validator";
import { IsCustomDateString } from "../decorators/custom-date.decorator.";

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsIn([
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ])
  weekDay!: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "time must be in the format HH:mm",
  })
  startTime!: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "time must be in the format HH:mm",
  })
  endTime!: string;

  @IsNotEmpty()
  @IsCustomDateString()
  startDate!: string;

  @IsNotEmpty()
  @IsCustomDateString()
  endDate!: string;

  @IsNotEmpty()
  @IsInt()
  duration!: number;
}
