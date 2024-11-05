import { Encrypt } from "../helper/encrypt";
import { RefreshTokenService } from "./refresh-token";
import jwt from "jsonwebtoken";

//this class regenerate access token after checking the user's refresh token
export class TokenService {
  async refreshToken(
    refreshToken: string
  ): Promise<{ error?: string; message?: string; newAccessToken?: {} }> {
    try {
      const decoded = RefreshTokenService.verifyToken(
        refreshToken
      ) as jwt.JwtPayload;
      // Generate a new access token
      const newAccessToken = Encrypt.generateAccessToken({
        id: decoded.id,
        role: decoded.role,
      });

      return { newAccessToken };
    } catch (error) {
      console.error("Invalid refresh token", error);
      return { error: " An unexpected error occured" };
    }
  }
}
