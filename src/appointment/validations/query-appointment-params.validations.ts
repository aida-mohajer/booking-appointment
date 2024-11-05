import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { CustomRequest } from "../../custom-request";
import { QueryAppointmentParamsDto } from "../dto/quey-appointment-params.dto";

export const validateQueryAppointmentparams = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { year, month, day } = req.query;

  // Check for unexpected query parameters
  const validParams = [
    "year",
    "month",
    "day",
    "limit",
    "page",
    "range",
    "isAvailable",
  ];
  const invalidParams = Object.keys(req.query).filter(
    (param) => !validParams.includes(param)
  );

  if (invalidParams.length > 0) {
    return res.status(400).json({
      error: `Invalid query parameter(s): ${invalidParams.join(", ")}`,
    });
  }

  const parsedYear = year ? parseInt(year as string) : undefined;
  const parsedMonth = month ? parseInt(month as string) : undefined;
  const parsedDay = day ? parseInt(day as string) : undefined;

  const dto = plainToClass(QueryAppointmentParamsDto, {
    ...req.query,
    year: parsedYear,
    month: parsedMonth,
    day: parsedDay,
  });

  validate(dto).then((errors) => {
    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));
      return res.status(400).json({ errors: formattedErrors });
    }

    req.dateQuery = { year: dto.year, month: dto.month, day: dto.day };
    next();
  });
};
