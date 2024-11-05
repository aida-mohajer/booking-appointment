import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

export class Encrypt {
  static async encryptPass(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  static comparePassword(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }

  static generateAccessToken(payload: { id: number; role: string }): string {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) throw new Error("JWT_SECRET for access token is not defined");
    return jwt.sign(payload, secret, { expiresIn: "2h" });
  }
}
