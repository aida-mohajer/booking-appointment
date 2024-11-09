import express from "express";
import { Response } from "express";
import { FeedbackService } from "./feedback.service";
import { FeebackController } from "./feedback.controller";
import { authentication } from "../middlewares/authentication";
import { validateId } from "../id.validation";
import { CustomRequest } from "../custom-request";
import { validateUpdateFeedbackDto } from "./validation/update-feedback";
import { validateFeedbackDto } from "./validation/feedback.validation";
import { checkRole } from "../middlewares/authorization";
import { Role } from "../enum/role.enum";

export const feedbackRouter = express.Router();
const feedbackService = new FeedbackService();
const feedbackController = new FeebackController(feedbackService);

feedbackRouter.post(
  "/:doctorId",
  authentication,
  checkRole([Role.Patient]),
  validateFeedbackDto,
  async (req: CustomRequest, res: Response) => {
    return await feedbackController.createFeedback(req, res);
  }
);

feedbackRouter.get("/:doctorId", async (req: CustomRequest, res: Response) => {
  return await feedbackController.getFeedbacks(req, res);
});

feedbackRouter.put(
  "/:feedbackId",
  authentication,
  checkRole([Role.Patient]),
  validateId,
  validateUpdateFeedbackDto,
  async (req: CustomRequest, res: Response) => {
    return await feedbackController.updateFeedback(req, res);
  }
);

feedbackRouter.delete(
  "/:feedbackId",
  authentication,
  checkRole([Role.Admin, Role.Patient]),
  validateId,
  async (req: CustomRequest, res: Response) => {
    return await feedbackController.deleteFeedback(req, res);
  }
);
