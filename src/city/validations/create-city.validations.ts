import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { CreateCityDto } from "../dto/create-city.dto";

export const validateCreateCityDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const createCityDto = Object.assign(new CreateCityDto(), req.body);
  const errors = await validate(createCityDto);

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
