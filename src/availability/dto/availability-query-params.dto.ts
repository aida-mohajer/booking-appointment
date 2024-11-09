import { IsOptional, IsNotEmpty, IsIn, IsBoolean } from "class-validator";
import { IsCustomDateString } from "../decorators/custom-date.decorator.";

export class AvailabilityQueryParamsDto {
  @IsOptional()
  @IsBoolean()
  @IsIn([true, false])
  isAvailable?: boolean;

  @IsNotEmpty()
  @IsCustomDateString()
  startDate!: Date;

  @IsNotEmpty()
  @IsCustomDateString()
  endDate!: Date;
}
