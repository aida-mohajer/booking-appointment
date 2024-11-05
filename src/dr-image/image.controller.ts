import { Response } from "express";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { UploadImageService } from "./image.service";
import { CustomRequest } from "../custom-request";

export class UploadImageController {
  constructor(private uploadImgService: UploadImageService) {}

  async uploadImage(req: CustomRequest, res: Response): Promise<Response> {
    const role = req.user?.role;
    if (role !== "doctor") {
      return res.status(401).json({ error: "User does not have permission" });
    }
    const doctorId = Number(req.params.doctorId);
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

  // async getImages(req: CustomRequest, res: Response): Promise<Response> {
  //   const role = req.user?.role;
  //   if (role !== "admin") {
  //     return res.status(401).json({ error: "User does not have permission" });
  //   }

  //   try {
  //     const originalDir = path.join(__dirname, "../images");

  //     // Read original images
  //     const originalImages = fs.readdirSync(originalDir).map((file) => ({
  //       fileName: file,
  //     }));

  //     return res.status(200).json({
  //       success: true,
  //       originalImages,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return res
  //       .status(500)
  //       .json({ success: false, message: "Error retrieving images." });
  //   }
  // }
  // async deleteCover(req: CustomRequest, res: Response): Promise<Response> {
  //   const fileName: string = req.params.fileName;

  //   if (!fileName) {
  //     return res
  //       .status(400)
  //       .json({ success: false, message: "No file name provided" });
  //   }

  //   try {
  //     const originalDir = path.join(__dirname, "../images");
  //     const originalFilePath = path.join(originalDir, fileName);

  //     // Check if the image is stored in the database
  //     const imageCheck = await this.uploadImgService.findCoverByFileName(
  //       fileName
  //     );

  //     if (imageCheck?.error) {
  //       return res
  //         .status(400)
  //         .json({ success: false, message: imageCheck.error });
  //     }

  //     // Remove original file if it exists
  //     if (fs.existsSync(originalFilePath)) {
  //       fs.unlinkSync(originalFilePath);
  //     } else {
  //       return res
  //         .status(404)
  //         .json({ success: false, message: "Original file not found" });
  //     }

  //     return res
  //       .status(200)
  //       .json({ success: true, message: "File deleted successfully" });
  //   } catch (error) {
  //     console.error(error);
  //     return res
  //       .status(500)
  //       .json({ success: false, message: "Error deleting file." });
  //   }
  // }
}
