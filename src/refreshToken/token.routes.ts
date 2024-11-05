import express, { Response } from "express";
import { TokenService } from "./token.service";
import { CustomRequest } from "../custom-request";
import { TokenConroller } from "./token.controller";

export const tokenRouter = express.Router();
const tokenService = new TokenService();
const tokenController = new TokenConroller(tokenService);

tokenRouter.post("", async (req: CustomRequest, res: Response) => {
  await tokenController.refreshToken(req, res);
});
