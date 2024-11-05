import { IsInt, IsString, Max, Min } from "class-validator";

export class FeedbackDto {
  @Min(1)
  @Max(4)
  @IsInt()
  rating!: number;
  @IsString()
  comment!: string;
}
