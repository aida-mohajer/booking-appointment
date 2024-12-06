import express, { Request, Response } from "express";
import { DrScheduleController } from "./dr-schedule.controller";
import { authentication } from "../middlewares/authentication";
import { validateScheduleDto } from "./validations/create-schedule.validation";
import { CustomRequest } from "../custom-request";
import { validateId } from "../id.validation";
import { checkRole } from "../middlewares/authorization";
import { Role } from "../enum/role.enum";
import { DrScheduleService } from "./dr-schedule.service";
import { validateScheduleQueryparams } from "./validations/schedule-query-params.validation";
import { validateUpdateScheduleDto } from "./validations/update-schedule.validations";

export const drScheduleRouter = express.Router();
const drScheduleService = new DrScheduleService();
const drScheduleController = new DrScheduleController(drScheduleService);

drScheduleRouter.post(
  "/create/hospital/:hospitalId/:doctorId?",
  authentication,
  checkRole([Role.Admin, Role.Doctor]),
  validateId,
  validateScheduleDto,
  async (req: Request, res: Response) => {
    await drScheduleController.createSchedule(req, res);
  }
);

drScheduleRouter.get(
  "/hospital/:hospitalId/doctor/:doctorId?",
  authentication,
  checkRole([Role.Doctor, Role.Admin]),
  validateId,
  async (req: CustomRequest, res: Response) => {
    await drScheduleController.getScheduleByDr(req, res);
  }
);

drScheduleRouter.get(
  "/available-slots/hospital/:hospitalId/doctor/:doctorId",
  validateId,
  validateScheduleQueryparams,
  async (req: CustomRequest, res: Response) => {
    await drScheduleController.getAvailableSlots(req, res);
  }
);

drScheduleRouter.put(
  "/update/:scheduleId/doctor/:doctorId?",
  authentication,
  checkRole([Role.Doctor, Role.Admin]),
  validateId,
  validateUpdateScheduleDto,
  async (req: CustomRequest, res: Response) => {
    await drScheduleController.updateSchedule(req, res);
  }
);

drScheduleRouter.delete(
  "/remove/schedule/:scheduleId/doctor/:doctorId?",
  authentication,
  checkRole([Role.Admin, Role.Doctor]),
  validateId,
  async (req: CustomRequest, res: Response) => {
    await drScheduleController.removeDrSchedule(req, res);
  }
);
