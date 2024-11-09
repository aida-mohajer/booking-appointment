import { Response } from "express";
import { CustomRequest } from "../custom-request";
import { AppointmentService } from "./appointment.service";

export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  async createAppointment(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const availabilityId = Number(req.params.availabilityId);
    const patientId = req.user?.id;
    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }
    const result = await this.appointmentService.createAppointment(
      patientId,
      availabilityId
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getAppointmentByDr(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const pagination = req.pagination;
    if (!pagination) {
      return res
        .status(400)
        .json({ error: "Pagination parameters are missing" });
    }
    const search = req.search;
    const doctorId = req.user?.id;
    if (!doctorId) {
      return res.status(401).json({ error: "Doctor ID is required" });
    }

    // Ensure startDate and endDate are defined and valid Date objects
    const startDate = req.query.startDate
      ? new Date(req.query.startDate as string)
      : null;
    const endDate = req.query.endDate
      ? new Date(req.query.endDate as string)
      : null;

    if (
      !startDate ||
      !endDate ||
      isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime())
    ) {
      return res.status(400).json({
        error: "startDate and endDate are required and must be valid dates",
      });
    }

    const result = await this.appointmentService.getAppointmentsByDr(
      doctorId,
      pagination,
      startDate,
      endDate,
      search
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getAppointmentByPatient(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const patientId = req.user?.id;
    if (!patientId) {
      return res.status(401).json({ error: "patient ID is required" });
    }

    const startDate = req.query.startDate
      ? new Date(req.query.startDate as string)
      : undefined;
    const endDate = req.query.endDate
      ? new Date(req.query.endDate as string)
      : undefined;

    const result = await this.appointmentService.getAppointmentsByPatient(
      patientId,
      startDate,
      endDate
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async cancelAppointment(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const appointmentId = Number(req.params.appointmentId);
    const patientId = req.user?.id;
    if (!patientId) {
      return res.status(401).json({ error: "patient ID is required" });
    }
    const result = await this.appointmentService.cancelAppointment(
      appointmentId,
      patientId
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }
}
