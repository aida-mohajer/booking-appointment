import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { LoginPatientDto } from "../dto/login-patient.dto";

export const validatePatientLoginDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const LoginDto = Object.assign(new LoginPatientDto(), req.body);
  const errors = await validate(LoginDto);

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
