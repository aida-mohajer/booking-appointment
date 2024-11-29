import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { TransactionDto } from "../dto/transaction.dto";

export const validateTransactionDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transactionDto = Object.assign(new TransactionDto(), req.body);
  const errors = await validate(transactionDto);

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      })),
    });
  }

  next();
};
