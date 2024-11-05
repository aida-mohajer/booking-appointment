import { Request, Response } from "express";
import { CustomRequest } from "../../custom-request";
// import { TokenBlacklistService } from "../../token-blacklist.service";
import { DoctorService } from "./doctor.service";

export class DoctorController {
  constructor(private drService: DoctorService) {}
  async registerDr(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const result = await this.drService.registerDr(data);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async loginDr(req: CustomRequest, res: Response): Promise<Response> {
    const data = req.body;
    const result = await this.drService.drLogin(data);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getDrs(req: CustomRequest, res: Response): Promise<Response> {
    const specializations = req.query.specializations
      ? (req.query.specializations as string).split(",")
      : [];
    const pagination = req.pagination;
    if (!pagination) {
      return res
        .status(400)
        .json({ error: "Pagination parameters are missing" });
    }
    const search = req.search;
    const sortBy = req.query.sortBy as string;
    const city = req.query.city as string;

    const result = await this.drService.getDrs(
      pagination,
      search,
      sortBy,
      city,
      specializations
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getDr(req: CustomRequest, res: Response): Promise<Response> {
    const doctorId = Number(req.params.doctorId);
    const result = await this.drService.getDr(doctorId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getMyProfile(req: CustomRequest, res: Response): Promise<Response> {
    const isAdmin = req.user?.role === "admin";
    const doctorId = isAdmin ? Number(req.query.doctorId) : req.user?.id;
    if (!doctorId) {
      return res.status(401).json({ error: "No id" });
    }
    const result = await this.drService.getMyProfile(doctorId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async updateDr(req: CustomRequest, res: Response): Promise<Response> {
    const isAdmin = req.user?.role === "admin";
    const doctorId = isAdmin ? parseInt(req.params.doctorId) : req.user?.id;
    if (!doctorId) {
      return res.status(401).json({ error: "No id" });
    }
    const data = req.body;
    const result = await this.drService.updateDr(doctorId, data);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async logoutDr(req: CustomRequest, res: Response): Promise<Response> {
    const isAdmin = req.user?.role === "admin";
    const doctorId = isAdmin ? Number(req.query.doctorId) : req.user?.id;
    if (!doctorId) {
      return res.status(401).json({ error: "No id" });
    }
    const result = await this.drService.logoutDr(doctorId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json(result);
  }

  async removeDr(req: CustomRequest, res: Response): Promise<Response> {
    const isAdmin = req.user?.role === "admin";
    const doctorId = isAdmin ? Number(req.query.doctorId) : req.user?.id;
    if (!doctorId) {
      return res.status(401).json({ error: "No id" });
    }
    const result = await this.drService.removeDr(doctorId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }
}