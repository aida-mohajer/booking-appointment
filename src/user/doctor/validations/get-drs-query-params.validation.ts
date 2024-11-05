import { Response, NextFunction } from "express";
import { validate } from "class-validator";
import { GetDrsQueryParamsDto } from "../dto/get-drs-query-params.dto";
import { CustomRequest } from "../../../custom-request";
import { plainToClass } from "class-transformer";

export const validateGetDrsQuertParamsDto = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // Check for unexpected query parameters
  const validParams = [
    "sortBy",
    "city",
    "specializations",
    "limit",
    "page",
    "name",
  ];
  const invalidParams = Object.keys(req.query).filter(
    (param) => !validParams.includes(param)
  );

  if (invalidParams.length > 0) {
    return res.status(400).json({
      error: `Invalid query parameter(s): ${invalidParams.join(", ")}`,
    });
  }
  const specializations = req.query.specializations
    ? typeof req.query.specializations === "string"
      ? (req.query.specializations as string).split(",")
      : req.query.specializations
    : undefined;

  const queryParamsDto = plainToClass(GetDrsQueryParamsDto, {
    ...req.query,
    specializations,
  });

  const errors = await validate(queryParamsDto);

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
