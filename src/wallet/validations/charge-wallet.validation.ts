import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { ChargeWalletDto } from "../dto/charge-wallet.dto";

export const validateChargeWalletDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const chargeWalletDto = Object.assign(new ChargeWalletDto(), req.body);
  const errors = await validate(chargeWalletDto);

  if (errors.length > 0) {
    res.status(400).json({
      error: "Validation failed",
      details: errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      })),
    });
    return;
  }

  next();
};
