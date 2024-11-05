import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { UpdateDrDto } from "../dto/update-dr.dto";

export const validateDrUpdateDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateDto = Object.assign(new UpdateDrDto(), req.body);
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
