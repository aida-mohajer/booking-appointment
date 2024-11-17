import { Request, Response, NextFunction } from "express";

// in this middleware i validate ids except patientid,doctorid and adminid because sometimes
//this ids would be optional
const isValidId = (id: string | undefined) => {
  if (id === undefined) return false;
  const idNumber = Number(id);
  return !isNaN(idNumber) && Number.isInteger(idNumber) && idNumber > 0;
};

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const {
    feedbackId,
    slotId,
    appointmentId,
    cityId,
    hospitalId,
    scheduleId,
    exceptionId,
  } = req.params;

  if (feedbackId && !isValidId(feedbackId)) {
    return res.status(400).json({
      error:
        "Invalid feedback ID format. Please provide a valid positive integer.",
    });
  }

  if (slotId && !isValidId(slotId)) {
    return res.status(400).json({
      error: "Invalid slot ID format. Please provide a valid positive integer.",
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

  if (hospitalId && !isValidId(hospitalId)) {
    return res.status(400).json({
      error:
        "Invalid hospital ID format. Please provide a valid positive integer.",
    });
  }

  if (scheduleId && !isValidId(scheduleId)) {
    return res.status(400).json({
      error:
        "Invalid schedule ID format. Please provide a valid positive integer.",
    });
  }
  if (exceptionId && !isValidId(exceptionId)) {
    return res.status(400).json({
      error:
        "Invalid exception ID format. Please provide a valid positive integer.",
    });
  }

  next();
};
