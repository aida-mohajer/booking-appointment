import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { UpdateAdminDto } from "../dto/update-admin.dto";

export const validateAdminUpdateDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateDto = Object.assign(new UpdateAdminDto(), req.body);
  const errors = await validate(updateDto);

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
