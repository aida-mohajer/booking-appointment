import { Response, NextFunction } from "express";
import { validate } from "class-validator";
import { CustomRequest } from "../../custom-request";
import { ScheduleQueryParamsDto } from "../dto/schedule-query-params.dto";

export const validateScheduleQueryparams = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const dto = Object.assign(new ScheduleQueryParamsDto(), req.query);

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
