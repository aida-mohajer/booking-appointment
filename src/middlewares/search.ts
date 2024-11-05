import { Response, NextFunction } from "express";
import { validate } from "class-validator";
import { CustomRequest } from "../custom-request";
import { SearchParamsDto } from "../search-param.dto";

export interface Search {
  // doctorName: string;
  // patientName: string;
  name: string;
  specialization: string;
}

export const search = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // const doctorNameParam = req.query.doctorName as string;
  // const patientNameParam = req.query.patientName as string;
  const nameParam = req.query.name as string;
  const specializationParam = req.query.specialization as string;

  const queryParams = {
    // doctorName: doctorNameParam,
    // patientName: patientNameParam,
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
  // if (doctorNameParam !== undefined && !isNaN(Number(doctorNameParam))) {
  //   return res
  //     .status(400)
  //     .json({ error: "search parameter must not be a number." });
  // }

  // if (patientNameParam !== undefined && !isNaN(Number(patientNameParam))) {
  //   return res
  //     .status(400)
  //     .json({ error: "search parameter must not be a number." });
  // }
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
    // doctorName: doctorNameParam,
    // patientName: patientNameParam,
    name: nameParam,
    specialization: specializationParam,
  };
  return next();
};
