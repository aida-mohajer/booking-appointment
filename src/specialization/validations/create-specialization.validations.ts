import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { CreateSpecializationDto } from "../dto/create-specialization.dto";

export const validateCreateSpecializationDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const createSpecializationDto = Object.assign(
    new CreateSpecializationDto(),
    req.body
  );
  const errors = await validate(createSpecializationDto);

  if (errors.length > 0) {
    res.status(400).json({
      error: "Validation failed",
      details: errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      })),
    });
    return;
  }

  next();
};
