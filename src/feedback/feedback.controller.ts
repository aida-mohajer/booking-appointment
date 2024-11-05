import { Response } from "express";
import { FeedbackService } from "./feedback.service";
import { CustomRequest } from "../custom-request";

export class FeebackController {
  constructor(private feedbackService: FeedbackService) {}

  async createFeedback(req: CustomRequest, res: Response): Promise<Response> {
    const data = req.body;
    const patientId = req.user?.id;
    if (!patientId) {
      return res.status(401).json({ error: "No patientId" });
    }
    const doctorId = Number(req.params.doctorId);

    const result = await this.feedbackService.createFeedback(
      data,
      patientId,
      doctorId
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getFeedbacks(req: CustomRequest, res: Response): Promise<Response> {
    const doctorId = Number(req.params.doctorId);
    const result = await this.feedbackService.getFeedbacks(doctorId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async updateFeedback(req: CustomRequest, res: Response): Promise<Response> {
    const data = req.body;
    const feedbackId = Number(req.params.feedbackId);
    const patientId = req.user?.id;
    if (!patientId) {
      return res.status(401).json({ error: "No patientId" });
    }
    const result = await this.feedbackService.updateFeedback(
      data,
      feedbackId,
      patientId
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async deleteFeedback(req: CustomRequest, res: Response): Promise<Response> {
    const feedbackId = Number(req.params.feedbackId);
    const patientId = req.user?.id;
    if (!patientId) {
      return res.status(401).json({ error: "No patientId" });
    }
    const result = await this.feedbackService.deleteFeedback(
      feedbackId,
      patientId
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }
}
