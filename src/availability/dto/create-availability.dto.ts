import { IsNotEmpty } from "class-validator";
import { IsCustomDateTimeString } from "../decorators/custom-dateTime.decorator";

export class CreateAvailabilityDto {
  @IsNotEmpty()
  @IsCustomDateTimeString()
  availableDate!: Date;
}
