import express, { Request, Response } from "express";
import { authentication } from "../middlewares/authentication";
import { CustomRequest } from "../custom-request";
import { validateId } from "../id.validation";
import { SpecializationService } from "./specialization.service";
import { SpecializationController } from "./specialization.controller";
import { validateAddSpecializationIdsToDrDto } from "./validations/add-specializationIds-dr.validation";
import { validateCreateSpecializationDto } from "./validations/create-specialization.validations";
import { checkRole } from "../middlewares/authorization";
import { Role } from "../enum/role.enum";

export const specializationRouter = express.Router();
const specializationService = new SpecializationService();
const specializationController = new SpecializationController(
  specializationService
);

specializationRouter.post(
  "/create",
  authentication,
  checkRole([Role.Admin]),
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
  checkRole([Role.Admin]),
  validateId,
  async (req: CustomRequest, res: Response) => {
    await specializationController.removeSpecialization(req, res);
  }
);

specializationRouter.post(
  "/add-to-dr/:doctorId?",
  authentication,
  checkRole([Role.Admin, Role.Doctor]),
  validateAddSpecializationIdsToDrDto,
  async (req: CustomRequest, res: Response) => {
    await specializationController.addSpecializationsToDr(req, res);
  }
);

specializationRouter.delete(
  "/remove-from-dr/:doctorId?/specialization/:specializationId",
  authentication,
  checkRole([Role.Admin, Role.Doctor]),
  validateId,
  async (req: CustomRequest, res: Response) => {
    await specializationController.removeDrSpecialization(req, res);
  }
);
