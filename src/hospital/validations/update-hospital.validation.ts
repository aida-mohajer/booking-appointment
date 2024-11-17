import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { CreateHospitalDto } from "../dto/create-hospital.dto";
import { UpdateHospitalDto } from "../dto/update-hospital.dto";

export const validateUpdateHospitalDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateHospitalDto = Object.assign(new UpdateHospitalDto(), req.body);
  const errors = await validate(updateHospitalDto);

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
