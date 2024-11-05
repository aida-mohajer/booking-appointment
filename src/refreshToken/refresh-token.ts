import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export class RefreshTokenService {
  static generateRefreshToken(payload: { id: number; role: string }): string {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    if (!secret) throw new Error("JWT_SECRET for refresh token is not defined");
    return jwt.sign(payload, secret, { expiresIn: "30d" });
  }

  static verifyToken(token: string): jwt.JwtPayload | string {
    try {
      const secret = process.env.REFRESH_TOKEN_SECRET;
      if (!secret)
        throw new Error("JWT_SECRET for refresh token is not defined");
      return jwt.verify(token, secret) as {
        id: number;
        role: string;
      };
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  // getTokenExpiration(decodedToken: jwt.JwtPayload): number {
  //   return decodedToken.exp
  //     ? decodedToken.exp - Math.floor(Date.now() / 1000)
  //     : 0;
  // }
}
