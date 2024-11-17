import express, { Request, Response } from "express";
import { authentication } from "../middlewares/authentication";
import { CustomRequest } from "../custom-request";
import { validateId } from "../id.validation";
import { checkRole } from "../middlewares/authorization";
import { Role } from "../enum/role.enum";
import { HospitalService } from "./hospital.service";
import { HospitalController } from "./hospital.controller";
import { validateCreateHospitalDto } from "./validations/create-hospital.validation";
import { validateAddHospitalIdsToDrDto } from "./validations/add-hospitalIds-dr.validations";
import { validateUpdateHospitalDto } from "./validations/update-hospital.validation";

export const hospitalRouter = express.Router();
const hospitalService = new HospitalService();
const hospitalController = new HospitalController(hospitalService);

hospitalRouter.post(
  "/create",
  authentication,
  checkRole([Role.Admin]),
  validateCreateHospitalDto,
  async (req: Request, res: Response) => {
    await hospitalController.createHospital(req, res);
  }
);

hospitalRouter.get("", async (req: CustomRequest, res: Response) => {
  await hospitalController.getHospitals(req, res);
});

hospitalRouter.put(
  "/update/:hospitalId",
  authentication,
  checkRole([Role.Admin]),
  validateUpdateHospitalDto,
  async (req: CustomRequest, res: Response) => {
    await hospitalController.updateHospital(req, res);
  }
);

hospitalRouter.delete(
  "/remove/:hospitalId",
  authentication,
  checkRole([Role.Admin]),
  validateId,
  async (req: CustomRequest, res: Response) => {
    await hospitalController.removeHospital(req, res);
  }
);

hospitalRouter.post(
  "/add-to-dr/:doctorId?",
  authentication,
  checkRole([Role.Admin, Role.Doctor]),
  validateAddHospitalIdsToDrDto,
  async (req: CustomRequest, res: Response) => {
    await hospitalController.addHospitalsToDr(req, res);
  }
);

hospitalRouter.delete(
  "/remove-from-dr/:doctorId?/hospital/:hospitalId",
  authentication,
  checkRole([Role.Admin, Role.Doctor]),
  validateId,
  async (req: CustomRequest, res: Response) => {
    await hospitalController.removeDrHospital(req, res);
  }
);
