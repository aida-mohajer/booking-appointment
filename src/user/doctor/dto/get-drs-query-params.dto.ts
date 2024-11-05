import { IsArray, IsIn, IsNumber, IsOptional, IsString } from "class-validator";

export class GetDrsQueryParamsDto {
  @IsOptional()
  @IsIn(["oldest", "newest", "lowestRated", "highestRated"])
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsIn(["Dermatology", "Family medicine", "Cardiology", "Allergist"], {
    each: true,
  })
  specializations?: string[];

  @IsOptional()
  @IsNumber()
  cityId?: number;
}
