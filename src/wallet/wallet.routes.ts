import express, { Response } from "express";
import { WalletController } from "./wallet.controller";
import { WalletService } from "./wallet.service";
import { authentication } from "../middlewares/authentication";
import { checkRole } from "../middlewares/authorization";
import { CustomRequest } from "../custom-request";
import { Role } from "../enum/role.enum";
import { validateChargeWalletDto } from "./validations/charge-wallet.validation";

export const walletRouter = express.Router();
const walletService = new WalletService();
const walletController = new WalletController(walletService);

walletRouter.post(
  "/charge",
  authentication,
  checkRole([Role.Patient]),
  validateChargeWalletDto,
  (req: CustomRequest, res: Response) => walletController.chargeWallet(req, res)
);

walletRouter.get(
  "/get-patient-wallet",
  authentication,
  checkRole([Role.Patient]),
  (req: CustomRequest, res: Response) =>
    walletController.getPatientWallet(req, res)
);

walletRouter.get(
  "/get-dr-wallet",
  authentication,
  checkRole([Role.Patient]),
  (req: CustomRequest, res: Response) => walletController.getDrWallet(req, res)
);
