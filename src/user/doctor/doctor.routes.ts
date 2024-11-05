import express, { Request, Response } from "express";
import { CustomRequest } from "../../custom-request";
import { authentication } from "../../middlewares/authentication";
import { DoctorService } from "./doctor.service";
import { DoctorController } from "./doctor.controller";
import { validateDrRegisterDto } from "./validations/dr-register.validation";
import { validateDrLoginDto } from "./validations/dr-login.validation";
import { validateDrUpdateDto } from "./validations/dr-update.validation";
import { validateId } from "../../id.validation";
import { pagination } from "../../middlewares/pagination";
import { search } from "../../middlewares/search";
import { isAdmin } from "../../middlewares/isAdmin";
import { isDoctor } from "../../middlewares/isDoctor";
import { isPatient } from "../../middlewares/isPatient";
import { validateGetDrsQuertParamsDto } from "./validations/get-drs-query-params.validation";

export const drRouter = express.Router();
const drService = new DoctorService();
const drController = new DoctorController(drService);

drRouter.post(
  "/register",
  validateDrRegisterDto,
  async (req: Request, res: Response) => {
    await drController.registerDr(req, res);
  }
);

drRouter.post(
  "/admin/register",
  authentication,
  isAdmin,
  validateDrRegisterDto,
  async (req: Request, res: Response) => {
    await drController.registerDr(req, res);
  }
);

drRouter.post(
  "/login",
  validateDrLoginDto,
  async (req: CustomRequest, res: Response) => {
    await drController.loginDr(req, res);
  }
);

drRouter.post(
  "/admin/login",
  authentication,
  isAdmin,
  validateDrLoginDto,
  async (req: CustomRequest, res: Response) => {
    await drController.loginDr(req, res);
  }
);

drRouter.get(
  "",
  pagination,
  search,
  validateGetDrsQuertParamsDto,
  async (req: CustomRequest, res: Response) => {
    await drController.getDrs(req, res);
  }
);

drRouter.get(
  "/:doctorId",
  validateId,
  async (req: CustomRequest, res: Response) => {
    await drController.getDr(req, res);
  }
);

drRouter.get(
  "/doctor",
  authentication,
  isDoctor,
  async (req: CustomRequest, res: Response) => {
    await drController.getMyProfile(req, res);
  }
);

drRouter.get(
  "/admin/:doctorId",
  authentication,
  isAdmin,
  validateId,
  async (req: CustomRequest, res: Response) => {
    await drController.getMyProfile(req, res);
  }
);

drRouter.put(
  "/update",
  authentication,
  isDoctor,
  validateDrUpdateDto,
  async (req: CustomRequest, res: Response) => {
    await drController.updateDr(req, res);
  }
);

drRouter.put(
  "/admin/update/:doctorId",
  authentication,
  isAdmin,
  validateId,
  validateDrUpdateDto,
  async (req: CustomRequest, res: Response) => {
    await drController.updateDr(req, res);
  }
);

drRouter.post(
  "/logout",
  authentication,
  isDoctor,
  async (req: CustomRequest, res: Response) => {
    await drController.logoutDr(req, res);
  }
);

drRouter.post(
  "/admin/logout/:doctorId",
  authentication,
  isAdmin,
  validateId,
  async (req: CustomRequest, res: Response) => {
    await drController.logoutDr(req, res);
  }
);

drRouter.delete(
  "/remove",
  authentication,
  isDoctor,
  async (req: CustomRequest, res: Response) => {
    await drController.removeDr(req, res);
  }
);

drRouter.delete(
  "/admin/remove/:doctorId",
  authentication,
  isAdmin,
  validateId,
  async (req: CustomRequest, res: Response) => {
    await drController.removeDr(req, res);
  }
);
