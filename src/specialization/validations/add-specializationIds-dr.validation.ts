import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { AddSpecializationIdsToDrDto } from "../dto/add-specializations-dr.dto";

export const validateAddSpecializationIdsToDrDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const addSpecializationIdsDto = Object.assign(
    new AddSpecializationIdsToDrDto(),
    req.body
  );
  const errors = await validate(addSpecializationIdsDto);

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
