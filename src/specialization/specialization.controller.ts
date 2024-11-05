import { Response } from "express";
import { CustomRequest } from "../custom-request";
import { SpecializationService } from "./specialization.service";

export class SpecializationController {
  constructor(private specializationService: SpecializationService) {}

  async createSpecialization(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const role = req.user?.role;
    if (!role) {
      return res.status(401).json({ error: "Not authorized" });
    }
    const data = req.body;
    const result = await this.specializationService.createSpecialization(data);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getSpecializations(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const result = await this.specializationService.getspecializations();
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async removeSpecialization(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const specializationId = Number(req.params.specializationId);

    const result = await this.specializationService.removeSpecialization(
      specializationId
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async addSpecializationsToDr(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const specializationIds = req.body;
    const isAdmin = req.user?.role === "admin";
    const doctorId = isAdmin ? Number(req.params.doctorId) : req.user?.id;

    if (!doctorId) {
      return res.status(401).json({ error: "No id" });
    }

    const result = await this.specializationService.addSpecializationIdsToDr(
      doctorId,
      specializationIds
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async removeDrSpecialization(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const specializationId = Number(req.params.specializationId);
    const isAdmin = req.user?.role === "admin";
    const doctorId = isAdmin ? Number(req.params.doctorId) : req.user?.id;

    if (!doctorId) {
      return res.status(401).json({ error: "No id" });
    }

    const result = await this.specializationService.removeDrSpecialization(
      specializationId,
      doctorId
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json(result);
  }
}
