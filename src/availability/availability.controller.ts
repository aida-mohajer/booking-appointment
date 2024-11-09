import { Response } from "express";
import { AvailabilityService } from "./availability.service";
import { CustomRequest } from "../custom-request";
import { Role } from "../enum/role.enum";

export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  async createAvailability(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const data = req.body;
    const isAdmin = req.user?.role === Role.Admin;
    const doctorId = isAdmin ? Number(req.params.doctorId) : req.user?.id;
    if (!doctorId || isNaN(doctorId)) {
      return res
        .status(400)
        .json({ error: "Doctor ID is required and must be valid" });
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
    const isAdmin = req.user?.role === Role.Admin;
    const doctorId = isAdmin ? Number(req.params.doctorId) : req.user?.id;
    if (!doctorId || isNaN(doctorId)) {
      return res
        .status(400)
        .json({ error: "Doctor ID is required and must be valid" });
    }

    const pagination = req.pagination;
    if (!pagination) {
      return res
        .status(400)
        .json({ error: "Pagination parameters are missing" });
    }

    const isAvailable =
      req.query.isAvailable === "true"
        ? true
        : req.query.isAvailable === "false"
        ? false
        : undefined;

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

    const result = await this.availabilityService.getAvailabilitiesByDr(
      doctorId,
      pagination,
      startDate,
      endDate,
      isAvailable
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
    const doctorId = Number(req.params.doctorId);
    if (!doctorId || isNaN(doctorId)) {
      return res
        .status(400)
        .json({ error: "Doctor ID is required and must be valid" });
    }

    const pagination = req.pagination;
    if (!pagination) {
      return res
        .status(400)
        .json({ error: "Pagination parameters are missing" });
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

    const result = await this.availabilityService.getAvailabilitiesByPatient(
      doctorId,
      pagination,
      startDate,
      endDate
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
    const isAdmin = req.user?.role === Role.Admin;
    const doctorId = isAdmin ? Number(req.params.doctorId) : req.user?.id;
    if (!doctorId || isNaN(doctorId)) {
      return res
        .status(400)
        .json({ error: "Doctor ID is required and must be valid" });
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
