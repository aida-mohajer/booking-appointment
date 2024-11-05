import { IsOptional, IsString } from "class-validator";

export class SearchParamsDto {
  // @IsString()
  // @IsOptional()
  // doctorName?: string;
  // @IsString()
  // @IsOptional()
  // patientName?: string;
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  specialization?: string;
}
