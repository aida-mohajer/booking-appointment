import {
  IsOptional,
  IsInt,
  IsNotEmpty,
  Min,
  Max,
  IsString,
  IsIn,
} from "class-validator";

//this dto is used in availability module for date validation
export class DateQueryParamsDto {
  @IsOptional()
  @IsInt()
  @Min(2010, { message: '"year" must be greater than or equal to 2010' })
  @Max(2025, { message: '"year" must be less than or equal to 2025' })
  year?: number;

  @IsOptional()
  @IsInt()
  @Min(1, { message: '"month" must be greater than or equal to 1' })
  @Max(12, { message: '"month" must be less than or equal to 12' })
  month?: number;

  @IsOptional()
  @IsInt()
  @Min(1, { message: '"day" must be greater than or equal to 1' })
  @Max(31, { message: '"day" must be less than or equal to 31' })
  day?: number;

  @IsOptional()
  @IsString()
  @IsIn(["today", "thisWeek", "thisMonth"])
  range?: string;
}
