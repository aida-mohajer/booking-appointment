import express, { Request, Response } from "express";
import { AvailabilityService } from "./availability.service";
import { AvailabilityController } from "./availability.controller";
import { authentication } from "../middlewares/authentication";
import { validateCreateAvailabilityDto } from "./validations/create-availability.validation";
import { CustomRequest } from "../custom-request";
import { validateId } from "../id.validation";
import { isDoctor } from "../middlewares/isDoctor";
import { isAdmin } from "../middlewares/isAdmin";
import { validateDateQueryparams } from "./validations/date-query-params.validation";
import { pagination } from "../middlewares/pagination";

export const availabilityRouter = express.Router();
const availabilityService = new AvailabilityService();
const availabilityController = new AvailabilityController(availabilityService);

availabilityRouter.post(
  "/create",
  authentication,
  isDoctor,
  validateCreateAvailabilityDto,
  async (req: Request, res: Response) => {
    await availabilityController.createAvailability(req, res);
  }
);

availabilityRouter.post(
  "/admin/create/:doctorId",
  authentication,
  isAdmin,
  validateId,
  validateCreateAvailabilityDto,
  async (req: Request, res: Response) => {
    await availabilityController.createAvailability(req, res);
  }
);

availabilityRouter.get(
  "/by-doctor",
  isDoctor,
  pagination,
  validateDateQueryparams,
  async (req: CustomRequest, res: Response) => {
    await availabilityController.getAvailabilitiesByDr(req, res);
  }
);

availabilityRouter.get(
  "/admin/:doctorId",
  isAdmin,
  validateId,
  pagination,
  validateDateQueryparams,
  async (req: CustomRequest, res: Response) => {
    await availabilityController.getAvailabilitiesByDr(req, res);
  }
);

availabilityRouter.get(
  "/:doctorId",
  validateId,
  pagination,
  validateDateQueryparams,
  async (req: CustomRequest, res: Response) => {
    await availabilityController.getAvailabilitiesBypatient(req, res);
  }
);

availabilityRouter.delete(
  "/remove/:availabilityId",
  authentication,
  isDoctor,
  validateId,
  async (req: CustomRequest, res: Response) => {
    await availabilityController.removeAvailability(req, res);
  }
);

availabilityRouter.delete(
  "/admin/remove/:availabilityId/dr/:doctorId",
  authentication,
  isAdmin,
  validateId,
  async (req: CustomRequest, res: Response) => {
    await availabilityController.removeAvailability(req, res);
  }
);
