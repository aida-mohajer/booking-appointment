import { IsArray, IsIn, IsOptional, IsString } from "class-validator";

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
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  hospital?: string;
}
