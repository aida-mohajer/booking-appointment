import { Response } from "express";
import { CustomRequest } from "../custom-request";
import { TokenService } from "./token.service";

export class TokenConroller {
  constructor(private tokenService: TokenService) {}
  async refreshToken(req: CustomRequest, res: Response): Promise<Response> {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }
    const result = await this.tokenService.refreshToken(refreshToken);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }
}
