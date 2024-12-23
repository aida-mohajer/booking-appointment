import { Response } from "express";
import { CustomRequest } from "../custom-request";
import { WalletService } from "./wallet.service";
import { ChargeWalletDto } from "./dto/charge-wallet.dto";

export class WalletController {
  constructor(private walletService: WalletService) {}

  async chargeWallet(req: CustomRequest, res: Response): Promise<void> {
    const data: ChargeWalletDto = req.body;
    const patientId = req.user?.id;
    if (!patientId) {
      res.status(400).json({ error: "Patient ID is required" });
      return;
    }

    try {
      const chargeWallet = await this.walletService.chargeWallet(
        data,
        patientId
      );
      res.status(200).json({
        success: true,
        message: "Wallet charged successfully",
        data: chargeWallet,
        patientId,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPatientWallet(req: CustomRequest, res: Response): Promise<void> {
    try {
      const patientId = req.user?.id;
      if (!patientId) {
        res.status(400).json({ error: "Patient ID is required" });
        return;
      }

      const wallet = await this.walletService.getPatientWallet(patientId);
      if (!wallet) {
        res.status(404).json({ error: "Patient wallet not found" });
        return;
      }

      res.status(200).json({
        success: true,
        data: wallet,
      });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to retrieve patient wallet" });
    }
  }

  async getDrWallet(req: CustomRequest, res: Response): Promise<void> {
    try {
      const patientId = req.user?.id;
      if (!patientId) {
        res.status(400).json({ error: "Dr ID is required" });
        return;
      }

      const wallet = await this.walletService.getDrWallet(patientId);
      if (!wallet) {
        res.status(404).json({ error: "Dr wallet not found" });
        return;
      }

      res.status(200).json({
        success: true,
        data: wallet,
      });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to retrieve dr wallet" });
    }
  }
}
