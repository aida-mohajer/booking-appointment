import { Response } from "express";
import { CustomRequest } from "../custom-request";
import { HospitalService } from "./hospital.service";

export class HospitalController {
  constructor(private hospitalService: HospitalService) {}

  async createHospital(req: CustomRequest, res: Response): Promise<Response> {
    const data = req.body;
    const result = await this.hospitalService.createHospital(data);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getHospitals(req: CustomRequest, res: Response): Promise<Response> {
    const result = await this.hospitalService.getHospitals();
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async updateHospital(req: CustomRequest, res: Response): Promise<Response> {
    const hospitalId = Number(req.params.hospitalId);
    const adminId = req.user?.id;
    if (!adminId) {
      return res.status(400).json({ error: "Admin ID is required" });
    }
    const data = req.body;
    const result = await this.hospitalService.updateHospital(hospitalId, data);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async removeHospital(req: CustomRequest, res: Response): Promise<Response> {
    const hospitalId = Number(req.params.hospitalId);

    const result = await this.hospitalService.removeHospital(hospitalId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async addHospitalsToDr(req: CustomRequest, res: Response): Promise<Response> {
    const hospitalIds = req.body;
    const isAdmin = req.user?.role === "admin";
    const doctorId = isAdmin ? Number(req.params.doctorId) : req.user?.id;
    if (!doctorId || isNaN(doctorId)) {
      return res
        .status(400)
        .json({ error: "Doctor ID is required and must be valid" });
    }

    const result = await this.hospitalService.addHospitalToDr(
      doctorId,
      hospitalIds
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async removeDrHospital(req: CustomRequest, res: Response): Promise<Response> {
    const hospitalId = Number(req.params.hospitalId);
    const isAdmin = req.user?.role === "admin";
    const doctorId = isAdmin ? Number(req.params.doctorId) : req.user?.id;
    if (!doctorId || isNaN(doctorId)) {
      return res
        .status(400)
        .json({ error: "Doctor ID is required and must be valid" });
    }

    const result = await this.hospitalService.removeDrHospital(
      hospitalId,
      doctorId
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json(result);
  }
}
