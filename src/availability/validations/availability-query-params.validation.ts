import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { CustomRequest } from "../../custom-request";
import { AvailabilityQueryParamsDto } from "../dto/availability-query-params.dto";

export const validateAvailabilityQueryparams = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { isAvailable } = req.query;

  const validParams = ["limit", "page", "isAvailable", "startDate", "endDate"];
  const invalidParams = Object.keys(req.query).filter(
    (param) => !validParams.includes(param)
  );

  if (invalidParams.length > 0) {
    return res.status(400).json({
      error: `Invalid query parameter(s): ${invalidParams.join(", ")}`,
    });
  }

  const parsedIsAvailable = isAvailable ? isAvailable === "true" : undefined;

  const dto = plainToClass(AvailabilityQueryParamsDto, {
    ...req.query,
    isAvailable: parsedIsAvailable,
  });

  validate(dto).then((errors) => {
    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));
      return res.status(400).json({ errors: formattedErrors });
    }

    next();
  });
};
