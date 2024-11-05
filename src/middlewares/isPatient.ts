import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../custom-request";
import { Role } from "../enum/role.enum";

export const isPatient = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role === Role.Patient) {
    return next();
  }
  return res.status(403).json({ message: "Access forbidden: Patients only" });
};
