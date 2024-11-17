import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { CreateScheduleDto } from "../dto/create-schedule.dto";

export const validateScheduleDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Transform request body into DTO
  const scheduleDto = Object.assign(new CreateScheduleDto(), req.body);
  const errors = await validate(scheduleDto);

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
