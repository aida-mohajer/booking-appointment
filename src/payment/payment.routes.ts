import express, { Response } from "express";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { authentication } from "../middlewares/authentication";
import { checkRole } from "../middlewares/authorization";
import { Role } from "../enum/role.enum";
import { CustomRequest } from "../custom-request";
import { validateTransactionDto } from "./validations/create-payment.validation";

export const paymentRouter = express.Router();
const paymentService = new PaymentService();
const paymentController = new PaymentController(paymentService);

paymentRouter.post(
  "",
  authentication,
  checkRole([Role.Patient]),
  validateTransactionDto,
  (req: CustomRequest, res: Response) => paymentController.transaction(req, res)
);

paymentRouter.get(
  "/track-transactions",
  authentication,
  checkRole([Role.Patient, Role.Doctor]),
  (req: CustomRequest, res: Response) =>
    paymentController.getTransactionHistory(req, res)
);
