import { Response } from "express";
import { CustomRequest } from "../custom-request";
import { CityService } from "./city.service";

export class CityController {
  constructor(private cityService: CityService) {}

  async createCity(req: CustomRequest, res: Response): Promise<Response> {
    const data = req.body;
    const result = await this.cityService.createCity(data);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getCities(req: CustomRequest, res: Response): Promise<Response> {
    const result = await this.cityService.getCities();
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async removeCity(req: CustomRequest, res: Response): Promise<Response> {
    const cityId = Number(req.params.cityId);

    const result = await this.cityService.removeCity(cityId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }
}
