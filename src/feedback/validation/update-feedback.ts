import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { UpdateFeedbackDto } from "../dto/update-feedback.dto";

export const validateUpdateFeedbackDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateFeedbackDto = Object.assign(new UpdateFeedbackDto(), req.body);
  const errors = await validate(updateFeedbackDto);

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
