import { IsOptional, IsString } from "class-validator";

export class SearchParamsDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  specialization?: string;
}
