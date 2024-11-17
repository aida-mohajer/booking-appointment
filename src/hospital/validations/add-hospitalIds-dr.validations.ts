import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { AddHospitalIdsToDrDto } from "../dto/add-hospitals-dr.dto";

export const validateAddHospitalIdsToDrDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const addHospitalsDto = Object.assign(new AddHospitalIdsToDrDto(), req.body);
  const errors = await validate(addHospitalsDto);

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
