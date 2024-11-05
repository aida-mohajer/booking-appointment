import express, { Request, Response } from "express";
import { authentication } from "../middlewares/authentication";
import { CustomRequest } from "../custom-request";
import { validateId } from "../id.validation";
import { CityService } from "./city.service";
import { CityController } from "./city.controller";
import { isAdmin } from "../middlewares/isAdmin";
import { validateCreateCityDto } from "./validations/create-city.validations";

export const cityRouter = express.Router();
const cityService = new CityService();
const cityController = new CityController(cityService);

cityRouter.post(
  "/create",
  authentication,
  isAdmin,
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
  isAdmin,
  validateId,
  async (req: CustomRequest, res: Response) => {
    await cityController.removeCity(req, res);
  }
);
