// import { Request, Response, NextFunction } from "express";
// import { validate } from "class-validator";
// import { CreateAppointmentDto } from "../dto/create-appointment.dto";

// export const validateCreateAppointmentDto = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const appointmentDto = Object.assign(new CreateAppointmentDto(), req.body);
//   const errors = await validate(appointmentDto);

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
