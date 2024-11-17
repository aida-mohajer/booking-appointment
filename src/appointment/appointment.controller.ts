import { Response } from "express";
import { CustomRequest } from "../custom-request";
import { AppointmentService } from "./appointment.service";

export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  async createAppointment(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const data = req.body;
    const hospitalId = Number(req.params.hospitalId);
    const doctorId = Number(req.params.doctorId);
    const patientId = req.user?.id;
    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }
    const result = await this.appointmentService.createAppointment(
      patientId,
      doctorId,
      hospitalId,
      data
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

    const hospitalId = Number(req.params.hospitalId);

    const startDate = req.query.startDate;
    if (!startDate || typeof startDate !== "string") {
      return res.status(400).json({ error: "A valid date is required" });
    }
    const endDate = req.query.endDate;
    if (!endDate || typeof endDate !== "string") {
      return res.status(400).json({ error: "A valid date is required" });
    }

    const result = await this.appointmentService.getAppointmentsByDr(
      doctorId,
      hospitalId,
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

    const startDate = req.query.startDate;
    if (!startDate || typeof startDate !== "string") {
      return res.status(400).json({ error: "A valid date is required" });
    }
    const endDate = req.query.endDate;
    if (!endDate || typeof endDate !== "string") {
      return res.status(400).json({ error: "A valid date is required" });
    }

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
