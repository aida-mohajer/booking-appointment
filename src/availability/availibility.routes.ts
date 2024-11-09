import express, { Request, Response } from "express";
import { AvailabilityService } from "./availability.service";
import { AvailabilityController } from "./availability.controller";
import { authentication } from "../middlewares/authentication";
import { validateCreateAvailabilityDto } from "./validations/create-availability.validation";
import { CustomRequest } from "../custom-request";
import { validateId } from "../id.validation";
import { validateAvailabilityQueryparams } from "./validations/availability-query-params.validation";
import { pagination } from "../middlewares/pagination";
import { checkRole } from "../middlewares/authorization";
import { Role } from "../enum/role.enum";

export const availabilityRouter = express.Router();
const availabilityService = new AvailabilityService();
const availabilityController = new AvailabilityController(availabilityService);

availabilityRouter.post(
  "/create/:doctorId?",
  authentication,
  checkRole([Role.Admin, Role.Doctor]),
  validateCreateAvailabilityDto,
  async (req: Request, res: Response) => {
    await availabilityController.createAvailability(req, res);
  }
);

availabilityRouter.get(
  "/by-dr/:doctorId?",
  authentication,
  checkRole([Role.Admin, Role.Doctor]),
  pagination,
  validateAvailabilityQueryparams,
  async (req: CustomRequest, res: Response) => {
    await availabilityController.getAvailabilitiesByDr(req, res);
  }
);

availabilityRouter.get(
  "/:doctorId",
  pagination,
  validateAvailabilityQueryparams,
  async (req: CustomRequest, res: Response) => {
    await availabilityController.getAvailabilitiesBypatient(req, res);
  }
);

availabilityRouter.delete(
  "/remove/:availabilityId/dr/:doctorId?",
  authentication,
  checkRole([Role.Admin, Role.Doctor]),
  validateId,
  async (req: CustomRequest, res: Response) => {
    await availabilityController.removeAvailability(req, res);
  }
);
