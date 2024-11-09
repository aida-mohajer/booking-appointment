import { NextFunction, Response } from "express";
import { CustomRequest } from "../custom-request";
import { Role } from "../enum/role.enum";

export const checkRole =
  (allowedRoles: Role[]) =>
  (req: CustomRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    // Check if userRole is a valid `Role`
    if (userRole && Object.values(Role).includes(userRole as Role)) {
      if (allowedRoles.includes(userRole as Role)) {
        return next();
      }
    }

    return res
      .status(403)
      .json({ message: "Access forbidden: Insufficient role permissions" });
  };
