import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { FeedbackDto } from "../dto/feedback.dto";

export const validateFeedbackDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const feedbackDto = Object.assign(new FeedbackDto(), req.body);
  const errors = await validate(feedbackDto);

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      })),
    });
  }

  next();
};
