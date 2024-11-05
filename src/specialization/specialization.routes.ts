import express, { Request, Response } from "express";
import { authentication } from "../middlewares/authentication";
import { CustomRequest } from "../custom-request";
import { validateId } from "../id.validation";
import { SpecializationService } from "./specialization.service";
import { SpecializationController } from "./specialization.controller";
import { validateAddSpecializationIdsToDrDto } from "./validations/add-specializationIds-dr.validation";
import { isAdmin } from "../middlewares/isAdmin";
import { isDoctor } from "../middlewares/isDoctor";
import { validateCreateSpecializationDto } from "./validations/create-specialization.validations";

export const specializationRouter = express.Router();
const specializationService = new SpecializationService();
const specializationController = new SpecializationController(
  specializationService
);

specializationRouter.post(
  "/create",
  authentication,
  isAdmin,
  validateCreateSpecializationDto,
  async (req: Request, res: Response) => {
    await specializationController.createSpecialization(req, res);
  }
);

specializationRouter.get("", async (req: CustomRequest, res: Response) => {
  await specializationController.getSpecializations(req, res);
});

specializationRouter.delete(
  "/remove/:specializationId",
  authentication,
  isAdmin,
  validateId,
  async (req: CustomRequest, res: Response) => {
    await specializationController.removeSpecialization(req, res);
  }
);

specializationRouter.post(
  "/add-to-dr",
  authentication,
  isDoctor,
  validateAddSpecializationIdsToDrDto,
  async (req: CustomRequest, res: Response) => {
    await specializationController.addSpecializationsToDr(req, res);
  }
);

specializationRouter.post(
  "/admin/add-to-dr/:doctorId",
  authentication,
  isAdmin,
  validateAddSpecializationIdsToDrDto,
  async (req: CustomRequest, res: Response) => {
    await specializationController.addSpecializationsToDr(req, res);
  }
);

specializationRouter.delete(
  "/remove-from-dr/specialization/:specializationId",
  authentication,
  isDoctor,
  validateId,
  async (req: CustomRequest, res: Response) => {
    await specializationController.removeDrSpecialization(req, res);
  }
);

specializationRouter.delete(
  "/admin/remove-from-dr/:doctorId/specialization/:specializationId",
  authentication,
  isAdmin,
  validateId,
  async (req: CustomRequest, res: Response) => {
    await specializationController.removeDrSpecialization(req, res);
  }
);
