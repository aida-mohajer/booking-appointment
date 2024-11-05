// import { Request, Response, NextFunction } from "express";
// import { validate } from "class-validator";
// import { UpdateAppointmentDto } from "../dto/update-appointment.dto";

// export const validateUpdateAppointmentDto = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const updateAppointmentDto = Object.assign(
//     new UpdateAppointmentDto(),
//     req.body
//   );
//   const errors = await validate(updateAppointmentDto);

//   if (errors.length > 0) {
//     return res.status(400).json({
//       error: "Validation failed",
//       details: errors.map((err) => ({
//         property: err.property,
//         constraints: err.constraints,
//       })),
//     });
//   }

//   next();
// };
