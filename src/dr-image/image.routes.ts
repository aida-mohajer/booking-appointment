import express, { Response } from "express";
import { UploadImageService } from "./image.service";
import { UploadImageController } from "./image.controller";
import { CustomRequest } from "../custom-request";
import { upload } from "../middlewares/upload";
import { validateId } from "../id.validation";
import { authentication } from "../middlewares/authentication";

export const uploadImageRouter = express.Router();
const uploadImageService = new UploadImageService();
const uploadImageController = new UploadImageController(uploadImageService);

uploadImageRouter.post(
  "/upload/:doctorId",
  authentication,
  upload,
  validateId,
  async (req: CustomRequest, res: Response) => {
    return await uploadImageController.uploadImage(req, res);
  }
);
