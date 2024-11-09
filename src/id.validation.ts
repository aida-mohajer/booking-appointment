import { Request, Response, NextFunction } from "express";

// in this middleware i validate ids except patientid,doctorid and adminid because sometimes
//this ids would be optional
const isValidId = (id: string | undefined) => {
  if (id === undefined) return false;
  const idNumber = Number(id);
  return !isNaN(idNumber) && Number.isInteger(idNumber) && idNumber > 0;
};

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { feedbackId, availabilityId, appointmentId, cityId } = req.params;

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

  if (cityId && !isValidId(cityId)) {
    return res.status(400).json({
      error: "Invalid city ID format. Please provide a valid positive integer.",
    });
  }

  next();
};
