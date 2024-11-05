import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { LoginAdminDto } from "../dto/login-admin.dto";

export const validateAdminLoginDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginDto = Object.assign(new LoginAdminDto(), req.body);
  const errors = await validate(loginDto);

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
