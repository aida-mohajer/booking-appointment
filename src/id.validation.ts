import { Request, Response, NextFunction } from "express";

// Utility function to validate an ID
const isValidId = (id: string | undefined): id is string => {
  if (id === undefined) return false;
  const idNumber = Number(id);
  return !isNaN(idNumber) && Number.isInteger(idNumber) && idNumber > 0;
};

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const {
    patientId,
    doctorId,
    feedbackId,
    availabilityId,
    appointmentId,
    adminId,
  } = req.params;

  if (patientId && !isValidId(patientId)) {
    return res.status(400).json({
      error:
        "Invalid patient ID format. Please provide a valid positive integer.",
    });
  }

  if (doctorId && !isValidId(doctorId)) {
    return res.status(400).json({
      error:
        "Invalid doctor ID format. Please provide a valid positive integer.",
    });
  }

  if (adminId && !isValidId(adminId)) {
    return res.status(400).json({
      error:
        "Invalid admin ID format. Please provide a valid positive integer.",
    });
  }

  if (feedbackId && !isValidId(feedbackId)) {
    return res.status(400).json({
      error:
        "Invalid feedback ID format. Please provide a valid positive integer.",
    });
  }

  if (availabilityId && !isValidId(availabilityId)) {
    return res.status(400).json({
      error:
        "Invalid availability ID format. Please provide a valid positive integer.",
    });
  }
  if (appointmentId && !isValidId(appointmentId)) {
    return res.status(400).json({
      error:
        "Invalid appointment ID format. Please provide a valid positive integer.",
    });
  }

  next();
};
