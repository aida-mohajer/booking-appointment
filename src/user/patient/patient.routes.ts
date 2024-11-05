import express, { Request, Response } from "express";
import { validatePatientRegisterDto } from "./validations/patient-register.validation";
import { PatientService } from "./patient.service";
import { PatientController } from "./patient.controller";
import { validatePatientLoginDto } from "./validations/patient-login.validation";
import { CustomRequest } from "../../custom-request";
import { authentication } from "../../middlewares/authentication";
import { validatePatientUpdateDto } from "./validations/patient-update.validation";
import { validateId } from "../../id.validation";
import { isAdmin } from "../../middlewares/isAdmin";
import { isPatient } from "../../middlewares/isPatient";
import { isDoctor } from "../../middlewares/isDoctor";
import { pagination } from "../../middlewares/pagination";
import { validateDateQueryparams } from "./validations/validate-date-query-params.validation";
import { search } from "../../middlewares/search";

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
  "/admin/register",
  authentication,
  isAdmin,
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

patientRouter.post(
  "/admin/login",
  authentication,
  isAdmin,
  validatePatientLoginDto,
  async (req: CustomRequest, res: Response) => {
    await patientController.loginPatient(req, res);
  }
);

patientRouter.get(
  "/with-appointments",
  authentication,
  isDoctor,
  pagination,
  search,
  validateDateQueryparams,
  async (req: CustomRequest, res: Response) => {
    await patientController.getDrPatients(req, res);
  }
);

patientRouter.get(
  "/admin/with-appointments/doctor/:doctorId",
  authentication,
  isAdmin,
  validateId,
  pagination,
  search,
  validateDateQueryparams,
  async (req: CustomRequest, res: Response) => {
    await patientController.getDrPatients(req, res);
  }
);

patientRouter.get(
  "",
  authentication,
  isPatient,
  async (req: CustomRequest, res: Response) => {
    await patientController.getMyProfile(req, res);
  }
);

patientRouter.get(
  "/admin/:patientId",
  authentication,
  isAdmin,
  validateId,
  async (req: CustomRequest, res: Response) => {
    await patientController.getMyProfile(req, res);
  }
);

patientRouter.put(
  "/update",
  authentication,
  isPatient,
  validatePatientUpdateDto,
  async (req: CustomRequest, res: Response) => {
    await patientController.updatePatient(req, res);
  }
);

patientRouter.put(
  "/admin/update/:patientId",
  authentication,
  isAdmin,
  validateId,
  validatePatientUpdateDto,
  async (req: CustomRequest, res: Response) => {
    await patientController.updatePatient(req, res);
  }
);

patientRouter.post(
  "/logout",
  authentication,
  isPatient,
  async (req: CustomRequest, res: Response) => {
    await patientController.logoutPatient(req, res);
  }
);

patientRouter.post(
  "/admin/logout/:patientId",
  authentication,
  isAdmin,
  validateId,
  async (req: CustomRequest, res: Response) => {
    await patientController.logoutPatient(req, res);
  }
);

patientRouter.delete(
  "/remove",
  authentication,
  isPatient,
  async (req: CustomRequest, res: Response) => {
    await patientController.removePatient(req, res);
  }
);

patientRouter.delete(
  "/admin/remove/:patientId",
  authentication,
  isAdmin,
  validateId,
  async (req: CustomRequest, res: Response) => {
    await patientController.removePatient(req, res);
  }
);
