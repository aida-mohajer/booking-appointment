import { Request, Response } from "express";
import { CustomRequest } from "../../custom-request";
import { AdminService } from "./admin.service";
// import { TokenBlacklistService } from "../../token-blacklist.service";

// const tokenBlacklistService = new TokenBlacklistService();

export class AdminController {
  constructor(private adminService: AdminService) {}
  async registerAdmin(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const result = await this.adminService.registerAdmin(data);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async loginAdmin(req: CustomRequest, res: Response): Promise<Response> {
    const data = req.body;
    const result = await this.adminService.adminLogin(data);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json(result);
  }

  async getAdmin(req: CustomRequest, res: Response): Promise<Response> {
    const adminId = req.user?.id;
    if (!adminId) {
      return res.status(401).json({ error: "No id" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "Access denied" });
    }
    const result = await this.adminService.getAdmin(adminId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getAdmins(req: CustomRequest, res: Response): Promise<Response> {
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "Access denied" });
    }
    const result = await this.adminService.getAdmins();
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async updateAdmin(req: CustomRequest, res: Response): Promise<Response> {
    const adminId = req.user?.id;
    if (!adminId) {
      return res.status(401).json({ error: "No id" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "Access denied" });
    }
    const data = req.body;
    const result = await this.adminService.updateAdmin(adminId, data);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async logoutAdmin(req: CustomRequest, res: Response): Promise<Response> {
    const adminId = req.user?.id;
    if (!adminId) {
      return res.status(401).json({ error: "No id" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "Access denied" });
    }
    const result = await this.adminService.logoutAdmin(adminId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json(result);
  }

  async removeAdmin(req: CustomRequest, res: Response): Promise<Response> {
    const adminId = req.user?.id;
    if (!adminId) {
      return res.status(401).json({ error: "No id" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "Access denied" });
    }
    const result = await this.adminService.removeAdmin(adminId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }
}
