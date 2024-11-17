import express, { Request, Response } from "express";
import { authentication } from "../middlewares/authentication";
import { CustomRequest } from "../custom-request";
import { validateId } from "../id.validation";
import { checkRole } from "../middlewares/authorization";
import { Role } from "../enum/role.enum";
import { DrExceptionsController } from "./dr-exceptions.controller";
import { DrExceptionsService } from "./dr-exceptions.service";
import { validateExceptionDto } from "./validations/add-exceptions.validations";

export const drExceptionsRouter = express.Router();
const drExceptionsService = new DrExceptionsService();
const drExceptionsController = new DrExceptionsController(drExceptionsService);

drExceptionsRouter.post(
  "/add/hospital/:hospitalId",
  authentication,
  checkRole([Role.Doctor]),
  validateId,
  validateExceptionDto,
  async (req: Request, res: Response) => {
    await drExceptionsController.addExceptions(req, res);
  }
);

drExceptionsRouter.get(
  "/hospital/:hospitalId",
  authentication,
  checkRole([Role.Doctor]),
  validateId,
  async (req: CustomRequest, res: Response) => {
    await drExceptionsController.getExceptions(req, res);
  }
);

drExceptionsRouter.delete(
  "/remove/:exceptionId",
  authentication,
  checkRole([Role.Doctor]),
  validateId,
  async (req: CustomRequest, res: Response) => {
    await drExceptionsController.removeException(req, res);
  }
);
