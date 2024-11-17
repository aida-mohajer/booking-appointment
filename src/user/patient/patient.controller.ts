import { Request, Response } from "express";
import { PatientService } from "./patient.service";
import { CustomRequest } from "../../custom-request";
// import { TokenBlacklistService } from "../../token-blacklist.service";
// const tokenBlacklistService = new TokenBlacklistService();

export class PatientController {
  constructor(private patientService: PatientService) {}

  async registerPatient(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const result = await this.patientService.registerPatient(data);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async loginPatient(req: CustomRequest, res: Response): Promise<Response> {
    const data = req.body;
    const result = await this.patientService.patientLogin(data);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json(result);
  }

  async getProfile(req: CustomRequest, res: Response): Promise<Response> {
    const patientId = req.user?.id;
    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const result = await this.patientService.getProfile(patientId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async updatePatient(req: CustomRequest, res: Response): Promise<Response> {
    const patientId = req.user?.id;
    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }
    const data = req.body;
    const result = await this.patientService.updatePatient(patientId, data);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async logoutPatient(req: CustomRequest, res: Response): Promise<Response> {
    const patientId = req.user?.id;
    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }
    const result = await this.patientService.logoutPatient(patientId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json(result);
  }

  async removePatient(req: CustomRequest, res: Response): Promise<Response> {
    const patientId = req.user?.id;
    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }
    const result = await this.patientService.removePatient(patientId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }
}
