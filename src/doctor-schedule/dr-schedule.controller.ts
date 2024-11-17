import { Response } from "express";
import { DrScheduleService } from "./dr-schedule.service";
import { CustomRequest } from "../custom-request";
import { Role } from "../enum/role.enum";

export class DrScheduleController {
  constructor(private drScheduleService: DrScheduleService) {}

  async createSchedule(req: CustomRequest, res: Response): Promise<Response> {
    const data = req.body;
    const isAdmin = req.user?.role === Role.Admin;
    const doctorId = isAdmin ? Number(req.params.doctorId) : req.user?.id;
    if (!doctorId || isNaN(doctorId)) {
      return res
        .status(400)
        .json({ error: "Doctor ID is required and must be valid" });
    }
    const hospitalId = Number(req.params.hospitalId);
    const result = await this.drScheduleService.createSchedule(
      doctorId,
      hospitalId,
      data
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getScheduleByDr(req: CustomRequest, res: Response): Promise<Response> {
    const hospitalId = Number(req.params.hospitalId);
    const doctorId = Number(req.params.doctorId);
    // const isAdmin = req.user?.role === Role.Admin;
    // const doctorId = isAdmin ? Number(req.params.doctorId) : req.user?.id;
    // if (!doctorId || isNaN(doctorId)) {
    //   return res
    //     .status(400)
    //     .json({ error: "Doctor ID is required and must be valid" });
    // }

    const result = await this.drScheduleService.getScheduleByDr(
      doctorId,
      hospitalId
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getAvailableSlots(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const hospitalId = Number(req.params.hospitalId);
    const doctorId = Number(req.params.doctorId);
    if (!doctorId || isNaN(doctorId)) {
      return res
        .status(400)
        .json({ error: "Doctor ID is required and must be valid" });
    }

    const date = req.query.date;

    // Ensure date is a string
    if (!date || typeof date !== "string") {
      return res.status(400).json({ error: "A valid date is required" });
    }
    const result = await this.drScheduleService.getAvailableSlots(
      doctorId,
      hospitalId,
      date
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async updateSchedule(req: CustomRequest, res: Response): Promise<Response> {
    const data = req.body;
    const isAdmin = req.user?.role === Role.Admin;
    const doctorId = isAdmin ? Number(req.params.doctorId) : req.user?.id;
    if (!doctorId || isNaN(doctorId)) {
      return res
        .status(400)
        .json({ error: "Doctor ID is required and must be valid" });
    }
    const scheduleId = Number(req.params.scheduleId);
    const result = await this.drScheduleService.updateDrSchedule(
      data,
      doctorId,
      scheduleId
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async removeDrSchedule(req: CustomRequest, res: Response): Promise<Response> {
    const scheduleId = Number(req.params.scheduleId);
    const isAdmin = req.user?.role === Role.Admin;
    const doctorId = isAdmin ? Number(req.params.doctorId) : req.user?.id;
    if (!doctorId || isNaN(doctorId)) {
      return res
        .status(400)
        .json({ error: "Doctor ID is required and must be valid" });
    }
    const result = await this.drScheduleService.removeDrSchedule(
      doctorId,
      scheduleId
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }
}
