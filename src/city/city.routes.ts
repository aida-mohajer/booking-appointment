import express, { Request, Response } from "express";
import { authentication } from "../middlewares/authentication";
import { CustomRequest } from "../custom-request";
import { validateId } from "../id.validation";
import { CityService } from "./city.service";
import { CityController } from "./city.controller";
import { validateCreateCityDto } from "./validations/create-city.validations";
import { checkRole } from "../middlewares/authorization";
import { Role } from "../enum/role.enum";

export const cityRouter = express.Router();
const cityService = new CityService();
const cityController = new CityController(cityService);

cityRouter.post(
  "/create",
  authentication,
  checkRole([Role.Admin]),
  validateCreateCityDto,
  async (req: Request, res: Response) => {
    await cityController.createCity(req, res);
  }
);

cityRouter.get("", async (req: CustomRequest, res: Response) => {
  await cityController.getCities(req, res);
});

cityRouter.delete(
  "/remove/:cityId",
  authentication,
  checkRole([Role.Admin]),
  validateId,
  async (req: CustomRequest, res: Response) => {
    await cityController.removeCity(req, res);
  }
);
