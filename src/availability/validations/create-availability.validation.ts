import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { CreateAvailabilityDto } from "../dto/create-availability.dto";

export const validateCreateAvailabilityDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const availabilityDto = Object.assign(new CreateAvailabilityDto(), req.body);
  const errors = await validate(availabilityDto);

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
