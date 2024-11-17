import express, { Request, Response } from "express";
import { authentication } from "../middlewares/authentication";
import { CustomRequest } from "../custom-request";
import { validateId } from "../id.validation";
import { AppointmentController } from "./appointment.controller";
import { AppointmentService } from "./appointment.service";
import { search } from "../middlewares/search";
import { pagination } from "../middlewares/pagination";
import { validateAppointmentQueryparams } from "./validations/appointment-query-params.validations";
import { checkRole } from "../middlewares/authorization";
import { Role } from "../enum/role.enum";
import { validateCreateAppointmentDto } from "./validations/create-appointment.validation";

export const appointmentRouter = express.Router();
const appointmentService = new AppointmentService();
const appointmentController = new AppointmentController(appointmentService);

appointmentRouter.post(
  "/create/doctor/:doctorId/hospital/:hospitalId",
  authentication,
  checkRole([Role.Patient]),
  validateId,
  validateCreateAppointmentDto,
  async (req: Request, res: Response) => {
    await appointmentController.createAppointment(req, res);
  }
);

appointmentRouter.get(
  "/by-dr/hospital/:hospitalId",
  authentication,
  checkRole([Role.Doctor]),
  validateId,
  pagination,
  search,
  validateAppointmentQueryparams,
  async (req: CustomRequest, res: Response) => {
    await appointmentController.getAppointmentByDr(req, res);
  }
);

appointmentRouter.get(
  "/by-patient",
  authentication,
  checkRole([Role.Patient]),
  validateAppointmentQueryparams,
  async (req: CustomRequest, res: Response) => {
    await appointmentController.getAppointmentByPatient(req, res);
  }
);

appointmentRouter.delete(
  "/remove/:appointmentId",
  authentication,
  checkRole([Role.Patient]),
  validateId,
  async (req: CustomRequest, res: Response) => {
    await appointmentController.cancelAppointment(req, res);
  }
);
