import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { CustomRequest } from "../../custom-request";
import { AppointmentQueryParamsDto } from "../dto/appointment-query-params.dto";

export const validateAppointmentQueryparams = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { isAvailable } = req.query;

  // Check for unexpected query parameters
  const validParams = ["limit", "page", "startDate", "endDate", "name"];
  const invalidParams = Object.keys(req.query).filter(
    (param) => !validParams.includes(param)
  );

  if (invalidParams.length > 0) {
    return res.status(400).json({
      error: `Invalid query parameter(s): ${invalidParams.join(", ")}`,
    });
  }

  const dto = plainToClass(AppointmentQueryParamsDto, {
    ...req.query,
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
