import { Request, Response } from "express";
import { PaymentService } from "./payment.service";
import { CustomRequest } from "../custom-request";
import { TransactionDto } from "./dto/transaction.dto";

export class PaymentController {
  constructor(private paymentService: PaymentService) {}
  async transaction(req: CustomRequest, res: Response) {
    const data: TransactionDto = req.body;

    try {
      const transaction = await this.paymentService.transaction(data);
      res.status(200).json({
        message: "Payment processed successfully",
        transaction,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTransactionHistory(
    req: CustomRequest,
    res: Response
  ): Promise<void> {
    try {
      const patientId = req.user?.id;
      const doctorId = req.user?.id;
      const userRole = req.user?.role;

      const walletType = userRole === "patient" ? "patient" : "doctor";

      if (walletType === "patient" && !patientId) {
        res.status(400).json({ error: "Patient ID is required" });
        return; // Stop further execution
      }

      if (walletType === "doctor" && !doctorId) {
        res.status(400).json({ error: "Doctor ID is required" });
        return; // Stop further execution
      }
      const history = await this.paymentService.getTransactionHistory(
        walletType,
        patientId,
        doctorId
      );

      res.status(200).json({
        success: true,
        data: history,
      });
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch wallet history" });
    }
  }
}
