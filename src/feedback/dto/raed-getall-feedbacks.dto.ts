import { Feedback } from "../../entity/feedback.entity";

export class ReadGetAllFeedbackDto {
  response?: Feedback[];
  totalFeedback?: number;
  message?: string;
  error?: string;
}
