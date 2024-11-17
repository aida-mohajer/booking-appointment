import express, { Request, Response } from "express";
import { validatePatientRegisterDto } from "./validations/patient-register.validation";
import { PatientService } from "./patient.service";
import { PatientController } from "./patient.controller";
import { validatePatientLoginDto } from "./validations/patient-login.validation";
import { CustomRequest } from "../../custom-request";
import { authentication } from "../../middlewares/authentication";
import { validatePatientUpdateDto } from "./validations/patient-update.validation";
import { checkRole } from "../../middlewares/authorization";
import { Role } from "../../enum/role.enum";

export const patientRouter = express.Router();
const patientService = new PatientService();
const patientController = new PatientController(patientService);

patientRouter.post(
  "/register",
  validatePatientRegisterDto,
  async (req: Request, res: Response) => {
    await patientController.registerPatient(req, res);
  }
);

patientRouter.post(
  "/login",
  validatePatientLoginDto,
  async (req: CustomRequest, res: Response) => {
    await patientController.loginPatient(req, res);
  }
);

patientRouter.get(
  "/profile",
  authentication,
  checkRole([Role.Patient]),
  async (req: CustomRequest, res: Response) => {
    await patientController.getProfile(req, res);
  }
);

patientRouter.put(
  "/update",
  authentication,
  checkRole([Role.Patient]),
  validatePatientUpdateDto,
  async (req: CustomRequest, res: Response) => {
    await patientController.updatePatient(req, res);
  }
);

patientRouter.post(
  "/logout",
  authentication,
  checkRole([Role.Patient]),
  async (req: CustomRequest, res: Response) => {
    await patientController.logoutPatient(req, res);
  }
);

patientRouter.delete(
  "/remove",
  authentication,
  checkRole([Role.Patient]),
  async (req: CustomRequest, res: Response) => {
    await patientController.removePatient(req, res);
  }
);
