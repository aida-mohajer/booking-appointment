import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";
import { IsCustomDateTimeString } from "../validations/dateTime.validation";

export class CreateAvailabilityDto {
  @IsNotEmpty()
  @IsCustomDateTimeString()
  availableDate!: string;

  @IsOptional()
  @IsBoolean({ message: "isAvailable must be a boolean" })
  isAvailable?: boolean;
}
