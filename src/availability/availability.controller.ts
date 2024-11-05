import { Response } from "express";
import { AvailabilityService } from "./availability.service";
import { CustomRequest } from "../custom-request";

export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  private isValidDate(year: number, month: number, day: number): boolean {
    const date = new Date(year, month - 1, day); // JavaScript months are zero-indexed (January is 0, December is 11)
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }

  async createAvailability(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const data = req.body;
    const isAdmin = req.user?.role === "admin";
    const doctorId = isAdmin ? Number(req.query.doctorId) : req.user?.id;
    if (!doctorId) {
      return res.status(401).json({ error: "No id" });
    }
    const result = await this.availabilityService.createAvailability(
      doctorId,
      data
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getAvailabilitiesByDr(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const isAdmin = req.user?.role === "admin";
    const doctorId = isAdmin ? Number(req.query.doctorId) : req.user?.id;
    if (!doctorId) {
      return res.status(401).json({ error: "No id" });
    }
    const pagination = req.pagination;
    if (!pagination) {
      return res
        .status(400)
        .json({ error: "Pagination parameters are missing" });
    }
    const range = req.query.range as string;
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

    const result = await this.availabilityService.getAvailabilitiesByDr(
      doctorId,
      pagination,
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

  async getAvailabilitiesBypatient(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const doctorId = parseInt(req.params.doctorId);
    const pagination = req.pagination;
    if (!pagination) {
      return res
        .status(400)
        .json({ error: "Pagination parameters are missing" });
    }
    const range = req.query.range as string;
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

    const result = await this.availabilityService.getAvailabilitiesByPatient(
      doctorId,
      pagination,
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

  async removeAvailability(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const availabilityId = Number(req.params.availabilityId);
    const isAdmin = req.user?.role === "admin";
    const doctorId = isAdmin ? Number(req.query.doctorId) : req.user?.id;
    if (!doctorId) {
      return res.status(401).json({ error: "No id" });
    }

    const result = await this.availabilityService.removeAvailability(
      availabilityId,
      doctorId
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }
}
