import { IsIn, IsNotEmpty, Matches } from "class-validator";
import { IsCustomDateString } from "../../doctor-schedule/decorators/custom-date.decorator.";

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsCustomDateString()
  appointmentDate!: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "time must be in the format HH:mm",
  })
  time!: string;
}
