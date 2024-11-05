import { AppDataSource } from "../data-source";
import { Doctor } from "../entity/doctor.entity";
import { Image } from "../entity/image.entity";
import fs from "fs";
import path from "path";

export class UploadImageService {
  constructor(
    private imageRepo = AppDataSource.getRepository(Image),
    private doctorRepo = AppDataSource.getRepository(Doctor)
  ) {}

  async uploadImage(
    doctorId: number,
    imageName: string
  ): Promise<{ message?: string; error?: string }> {
    try {
      const doctor = await this.doctorRepo.findOne({
        where: { id: doctorId },
      });
      if (!doctor) {
        return { error: "Doctor not found" };
      }

      const existingImage = await this.imageRepo.findOne({
        where: { doctorId: doctorId },
      });

      if (existingImage) {
        const oldImagePath = path.join(
          __dirname,
          "../images",
          existingImage.imageName
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete old image file
        }

        // Update the existing record with the new image name
        existingImage.imageName = imageName;
        await this.imageRepo.save(existingImage);
      } else {
        const drImage = this.imageRepo.create({
          doctorId: doctorId,
          imageName: imageName,
        });
        await this.imageRepo.save(drImage);
      }
      return {
        message: "Image uploaded successfully",
      };
    } catch (error) {
      console.error("Error saving image:", error);
      return { error: "Error saving image" };
    }
  }

  async findCoverByFileName(
    fileName: string
  ): Promise<void | { error?: string }> {
    const image = await this.imageRepo.findOne({
      where: { imageName: fileName },
    });
    if (image) {
      return { error: "this image is in use by doctor" };
    }
  }
}
