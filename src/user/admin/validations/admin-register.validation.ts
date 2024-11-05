import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { RegisterAdminDto } from "../dto/register-admin.dto";

export const validateAdminRegisterDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const registerDto = Object.assign(new RegisterAdminDto(), req.body);
  const errors = await validate(registerDto);

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
