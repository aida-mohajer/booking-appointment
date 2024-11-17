import express, { Request, Response } from "express";
import { CustomRequest } from "../../custom-request";
import { authentication } from "../../middlewares/authentication";
import { DoctorService } from "./doctor.service";
import { DoctorController } from "./doctor.controller";
import { validateDrRegisterDto } from "./validations/dr-register.validation";
import { validateDrLoginDto } from "./validations/dr-login.validation";
import { validateDrUpdateDto } from "./validations/dr-update.validation";
import { pagination } from "../../middlewares/pagination";
import { search } from "../../middlewares/search";
import { validateGetDrsQuertParamsDto } from "./validations/get-drs-query-params.validation";
import { checkRole } from "../../middlewares/authorization";
import { Role } from "../../enum/role.enum";

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
  "/login",
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
  "/profile",
  authentication,
  checkRole([Role.Doctor]),
  async (req: CustomRequest, res: Response) => {
    await drController.getProfile(req, res);
  }
);

drRouter.get("/get-dr/:doctorId", async (req: CustomRequest, res: Response) => {
  await drController.getDr(req, res);
});

drRouter.put(
  "/update",
  authentication,
  checkRole([Role.Doctor]),
  validateDrUpdateDto,
  async (req: CustomRequest, res: Response) => {
    await drController.updateDr(req, res);
  }
);

drRouter.post(
  "/logout",
  authentication,
  checkRole([Role.Doctor]),
  async (req: CustomRequest, res: Response) => {
    await drController.logoutDr(req, res);
  }
);

drRouter.delete(
  "/remove/:doctorId?",
  authentication,
  checkRole([Role.Admin, Role.Doctor]),
  async (req: CustomRequest, res: Response) => {
    await drController.removeDr(req, res);
  }
);
