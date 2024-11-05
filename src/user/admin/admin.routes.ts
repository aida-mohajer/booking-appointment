import express, { Request, Response } from "express";
import { CustomRequest } from "../../custom-request";
import { authentication } from "../../middlewares/authentication";
import { validateId } from "../../id.validation";
import { validateAdminRegisterDto } from "./validations/admin-register.validation";
import { validateAdminLoginDto } from "./validations/admin-login-validation";
import { validateAdminUpdateDto } from "./validations/admin-update.validation";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";

export const adminRouter = express.Router();
const adminService = new AdminService();
const adminController = new AdminController(adminService);

adminRouter.post(
  "/register",
  validateAdminRegisterDto,
  async (req: Request, res: Response) => {
    await adminController.registerAdmin(req, res);
  }
);

adminRouter.post(
  "/login",
  validateAdminLoginDto,
  async (req: CustomRequest, res: Response) => {
    await adminController.loginAdmin(req, res);
  }
);

adminRouter.get(
  "/:adminId",
  authentication,
  validateId,
  async (req: CustomRequest, res: Response) => {
    await adminController.getAdmin(req, res);
  }
);

adminRouter.get(
  "",
  authentication,
  async (req: CustomRequest, res: Response) => {
    await adminController.getAdmins(req, res);
  }
);

adminRouter.put(
  "/update",
  authentication,
  validateAdminUpdateDto,
  async (req: CustomRequest, res: Response) => {
    await adminController.updateAdmin(req, res);
  }
);

adminRouter.post(
  "/logout",
  authentication,
  async (req: CustomRequest, res: Response) => {
    await adminController.logoutAdmin(req, res);
  }
);

adminRouter.delete(
  "/remove",
  authentication,
  async (req: CustomRequest, res: Response) => {
    await adminController.removeAdmin(req, res);
  }
);
