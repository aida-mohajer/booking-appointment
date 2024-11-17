import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { CreateHospitalDto } from "../dto/create-hospital.dto";

export const validateCreateHospitalDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const createHospitalDto = Object.assign(new CreateHospitalDto(), req.body);
  const errors = await validate(createHospitalDto);

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
