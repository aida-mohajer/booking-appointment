import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateFeedbackDto {
  @Min(1)
  @Max(4)
  @IsInt()
  @IsOptional()
  rating!: number;
  @IsString()
  @IsOptional()
  comment!: string;
}
