import { IsNotEmpty, IsString, Matches } from "class-validator";
import { IsCustomDateString } from "../../doctor-schedule/decorators/custom-date.decorator.";

export class AddExceptionDto {
  @IsString()
  @IsNotEmpty()
  @IsCustomDateString()
  startDate!: string;

  @IsString()
  @IsNotEmpty()
  @IsCustomDateString()
  endDate!: string;

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
}
