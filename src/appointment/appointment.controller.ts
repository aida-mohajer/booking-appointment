import { Response } from "express";
import { CustomRequest } from "../custom-request";
import { AppointmentService } from "./appointment.service";

export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}
  private isValidDate(year: number, month: number, day: number): boolean {
    const date = new Date(year, month - 1, day); // JavaScript months are zero-indexed (January is 0, December is 11)
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }

  async createAppointment(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const availabilityId = Number(req.params.availabilityId);
    const doctorId = Number(req.params.doctorId);
    const isAdmin = req.user?.role === "admin";
    const patientId = isAdmin ? Number(req.query.patientId) : req.user?.id;
    if (!patientId) {
      return res.status(401).json({ error: "No id" });
    }
    const result = await this.appointmentService.createAppointment(
      patientId,
      doctorId,
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
    const isAdmin = req.user?.role === "admin";
    const doctorId = isAdmin ? Number(req.query.doctorId) : req.user?.id;
    if (!doctorId) {
      return res.status(401).json({ error: "No id" });
    }
    const isAvailable =
      req.query.isAvailable === "true"
        ? true
        : req.query.isAvailable === "false"
        ? false
        : undefined;

    const range = req.query.range;
    const { year, month, day } = req.dateQuery!;

    let startDate, endDate;
    if (range) {
      switch (range) {
        case "today":
          startDate = new Date();
          endDate = new Date();
          break;
        case "thisWeek":
          startDate = new Date();
          endDate = new Date();
          endDate.setDate(startDate.getDate() + 7);
          break;
        case "thisMonth":
          startDate = new Date();
          endDate = new Date();
          endDate.setMonth(startDate.getMonth() + 1);
          break;
        default:
          return res.status(400).json({ error: "Invalid range parameter" });
      }
    }

    // Check date parameters in the order: year > month > day
    if (day) {
      if (month === undefined || year === undefined) {
        return res.status(400).json({
          error:
            "If day is provided, both year and month must also be specified.",
        });
      }
      if (!this.isValidDate(year, month, day)) {
        return res.status(400).json({
          error: "Invalid date provided for the specified month and year",
        });
      }
    } else if (month) {
      if (year === undefined) {
        return res.status(400).json({
          error: "If month is provided, year must also be specified.",
        });
      }
    } else if (year) {
      return res.status(400).json({
        error: "Month must be specified",
      });
    }
    const result = await this.appointmentService.getAppointmentsByDr(
      doctorId,
      pagination,
      isAvailable,
      search,
      startDate,
      endDate,
      year,
      month,
      day
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
    const doctorId = Number(req.params.doctorId);

    const isAdmin = req.user?.role === "admin";
    const patientId = isAdmin ? Number(req.query.patientId) : req.user?.id;
    if (!patientId) {
      return res.status(401).json({ error: "No id" });
    }

    const result = await this.appointmentService.getAppointmentsByPatient(
      doctorId
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
      return res.status(401).json({ error: "No id" });
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
