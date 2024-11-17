import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { AddExceptionDto } from "../dto/add-exception.dto";

export const validateExceptionDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Transform request body into DTO
  const exceptionDto = Object.assign(new AddExceptionDto(), req.body);
  const errors = await validate(exceptionDto);

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
