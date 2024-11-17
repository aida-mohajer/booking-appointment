import { Response } from "express";
import { CustomRequest } from "../custom-request";
import { DrExceptionsService } from "./dr-exceptions.service";

export class DrExceptionsController {
  constructor(private drExceptionsService: DrExceptionsService) {}

  async addExceptions(req: CustomRequest, res: Response): Promise<Response> {
    const data = req.body;
    const hospitalId = Number(req.params.hospitalId);
    const doctorId = req.user?.id;
    if (!doctorId) {
      return res.status(400).json({ error: "Doctor ID is required" });
    }
    const result = await this.drExceptionsService.addException(
      doctorId,
      hospitalId,
      data
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getExceptions(req: CustomRequest, res: Response): Promise<Response> {
    const doctorId = req.user?.id;
    if (!doctorId) {
      return res.status(401).json({ error: "Doctor ID is required" });
    }

    const hospitalId = Number(req.params.hospitalId);

    const result = await this.drExceptionsService.getExceptions(
      doctorId,
      hospitalId
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async removeException(req: CustomRequest, res: Response): Promise<Response> {
    const exceptionId = Number(req.params.exceptionId);
    const doctorId = req.user?.id;
    if (!doctorId) {
      return res.status(401).json({ error: "Doctor ID is required" });
    }
    const result = await this.drExceptionsService.removeException(
      doctorId,
      exceptionId
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }
}
