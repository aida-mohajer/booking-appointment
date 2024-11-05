import { Request, Response } from "express";
import { PatientService } from "./patient.service";
import { CustomRequest } from "../../custom-request";
// import { TokenBlacklistService } from "../../token-blacklist.service";

// const tokenBlacklistService = new TokenBlacklistService();

export class PatientController {
  constructor(private patientService: PatientService) {}

  private isValidDate(year: number, month: number, day: number): boolean {
    const date = new Date(year, month - 1, day); // JavaScript months are zero-indexed (January is 0, December is 11)
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }

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

  async getMyProfile(req: CustomRequest, res: Response): Promise<Response> {
    const isAdmin = req.user?.role === "admin";
    const patientId = isAdmin ? Number(req.params.patientId) : req.user?.id;

    if (!patientId) {
      return res.status(401).json({ error: "No id" });
    }
    const result = await this.patientService.getMyProfile(patientId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getDrPatients(req: CustomRequest, res: Response): Promise<Response> {
    const search = req.search;
    const pagination = req.pagination;
    if (!pagination) {
      return res
        .status(400)
        .json({ error: "Pagination parameters are missing" });
    }
    const isAdmin = req.user?.role === "admin";
    const doctorId = isAdmin ? parseInt(req.params.doctorId) : req.user?.id;
    if (!doctorId) {
      return res.status(401).json({ error: "No id" });
    }
    const { year, month, day } = req.dateQuery!;
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
    }
    const result = await this.patientService.getDrPatients(
      doctorId,
      pagination,
      year,
      search,
      month,
      day
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async updatePatient(req: CustomRequest, res: Response): Promise<Response> {
    const isAdmin = req.user?.role === "admin";
    const patientId = isAdmin ? Number(req.params.patientId) : req.user?.id;
    if (!patientId) {
      return res.status(401).json({ error: "No id" });
    }
    const data = req.body;
    const result = await this.patientService.updatePatient(patientId, data);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async logoutPatient(req: CustomRequest, res: Response): Promise<Response> {
    const isAdmin = req.user?.role === "admin";
    const patientId = isAdmin ? Number(req.params.patientId) : req.user?.id;
    if (!patientId) {
      return res.status(401).json({ error: "No id" });
    }
    const result = await this.patientService.logoutPatient(patientId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json(result);
  }

  async removePatient(req: CustomRequest, res: Response): Promise<Response> {
    const isAdmin = req.user?.role === "admin";
    const patientId = isAdmin ? Number(req.params.patientId) : req.user?.id;
    if (!patientId) {
      return res.status(401).json({ error: "No id" });
    }
    const result = await this.patientService.removePatient(patientId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }
}