import { Response } from "express";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { UploadImageService } from "./image.service";
import { CustomRequest } from "../custom-request";
import { Role } from "../enum/role.enum";

export class UploadImageController {
  constructor(private uploadImgService: UploadImageService) {}

  async uploadImage(req: CustomRequest, res: Response): Promise<Response> {
    const isAdmin = req.user?.role === Role.Admin;
    const doctorId = isAdmin ? Number(req.params.doctorId) : req.user?.id;
    if (!doctorId || isNaN(doctorId)) {
      return res
        .status(400)
        .json({ error: "Doctor ID is required and must be valid" });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    try {
      const originalDir = path.join(__dirname, "../images");

      // Ensure directories exist
      if (!fs.existsSync(originalDir)) {
        fs.mkdirSync(originalDir, { recursive: true });
      }

      const timestamp = Date.now();

      const originalFileName = `${timestamp}-${
        path.parse(req.file.originalname).name
      }.webp`;
      const originalFilePath = path.join(originalDir, originalFileName);
      await sharp(req.file.buffer).toFile(originalFilePath);

      // const originalSize = fs.statSync(originalFilePath).size;

      const result = await this.uploadImgService.uploadImage(
        doctorId,
        originalFileName
      );
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      return res.status(201).json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Error processing image." });
    }
  }
}
