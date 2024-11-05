import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { RegisterDrDto } from "../dto/register-dr.dto";

export const validateDrRegisterDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const registerDr = Object.assign(new RegisterDrDto(), req.body);
  const errors = await validate(registerDr);

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
