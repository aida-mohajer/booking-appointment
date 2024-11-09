import { Response, NextFunction } from "express";
import { validate } from "class-validator";
import { CustomRequest } from "../custom-request";
import { SearchParamsDto } from "../search-param.dto";

export interface Search {
  name: string;
  specialization: string;
}

export const search = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const nameParam = req.query.name as string;
  const specializationParam = req.query.specialization as string;

  const queryParams = {
    name: nameParam,
    specialization: specializationParam,
  };

  const queryParamDto = Object.assign(new SearchParamsDto(), queryParams);
  const errors = await validate(queryParamDto);

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      })),
    });
  }

  if (nameParam !== undefined && !isNaN(Number(nameParam))) {
    return res
      .status(400)
      .json({ error: "search parameter must not be a number." });
  }

  if (
    specializationParam !== undefined &&
    !isNaN(Number(specializationParam))
  ) {
    return res
      .status(400)
      .json({ error: "search parameter must not be a number." });
  }

  req.search = {
    name: nameParam,
    specialization: specializationParam,
  };
  return next();
};
