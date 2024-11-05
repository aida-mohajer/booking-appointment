import express, { Request, Response } from "express";
import { authentication } from "../middlewares/authentication";
import { CustomRequest } from "../custom-request";
import { validateId } from "../id.validation";
import { AppointmentController } from "./appointment.controller";
import { AppointmentService } from "./appointment.service";
import { search } from "../middlewares/search";
import { isPatient } from "../middlewares/isPatient";
import { isAdmin } from "../middlewares/isAdmin";
import { isDoctor } from "../middlewares/isDoctor";
import { pagination } from "../middlewares/pagination";
import { validateQueryAppointmentparams } from "./validations/query-appointment-params.validations";

export const appointmentRouter = express.Router();
const appointmentService = new AppointmentService();
const appointmentController = new AppointmentController(appointmentService);

appointmentRouter.post(
  "/create/doctor/:doctorId/availability/:availabilityId",
  authentication,
  isPatient,
  validateId,
  async (req: Request, res: Response) => {
    await appointmentController.createAppointment(req, res);
  }
);

appointmentRouter.post(
  "/admin/create/doctor/:doctorId/availability/:availabilityId/patient/:patientId",
  authentication,
  isAdmin,
  validateId,
  async (req: Request, res: Response) => {
    await appointmentController.createAppointment(req, res);
  }
);

appointmentRouter.get(
  "/by-dr",
  authentication,
  isDoctor,
  pagination,
  search,
  validateQueryAppointmentparams,
  async (req: CustomRequest, res: Response) => {
    await appointmentController.getAppointmentByDr(req, res);
  }
);

appointmentRouter.get(
  "/admin/by-dr/:doctorId",
  authentication,
  isAdmin,
  validateId,
  pagination,
  search,
  validateQueryAppointmentparams,
  async (req: CustomRequest, res: Response) => {
    await appointmentController.getAppointmentByDr(req, res);
  }
);

appointmentRouter.get(
  "/by-patient/doctor/:doctorId",
  authentication,
  isPatient,
  validateId,
  async (req: CustomRequest, res: Response) => {
    await appointmentController.getAppointmentByPatient(req, res);
  }
);

appointmentRouter.get(
  "/admin/by-patient/doctor/:doctorId/patient/:patientId",
  authentication,
  isAdmin,
  validateId,
  async (req: CustomRequest, res: Response) => {
    await appointmentController.getAppointmentByPatient(req, res);
  }
);

appointmentRouter.delete(
  "/remove/:appointmentId",
  authentication,
  isDoctor,
  validateId,
  async (req: CustomRequest, res: Response) => {
    await appointmentController.cancelAppointment(req, res);
  }
);

appointmentRouter.delete(
  "/admin/remove/:appointmentId/doctor/:doctorId",
  authentication,
  isAdmin,
  validateId,
  async (req: CustomRequest, res: Response) => {
    await appointmentController.cancelAppointment(req, res);
  }
);
