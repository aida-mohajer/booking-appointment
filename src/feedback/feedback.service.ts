import { AppDataSource } from "../data-source";
import { Doctor } from "../entity/doctor.entity";
import { Feedback } from "../entity/feedback.entity";
import { Patient } from "../entity/patient.entity";
import { FeedbackDto } from "./dto/feedback.dto";
import { ReadGetAllFeedbackDto } from "./dto/raed-getall-feedbacks.dto";
import { UpdateFeedbackDto } from "./dto/update-feedback.dto";

export class FeedbackService {
  constructor(
    private feedbackRepo = AppDataSource.getRepository(Feedback),
    private patientRepo = AppDataSource.getRepository(Patient),
    private doctorRepo = AppDataSource.getRepository(Doctor)
  ) {}

  async createFeedback(
    data: FeedbackDto,
    patientId: number,
    doctorId: number
  ): Promise<{ message?: string; error?: string }> {
    try {
      const patient = await this.patientRepo.findOne({
        where: { id: patientId },
      });
      if (!patient) {
        return { error: "Patient not found" };
      }

      const doctor = await this.doctorRepo.findOne({
        where: { id: doctorId },
      });
      if (!doctor) {
        return { error: "Doctor not found" };
      }

      const existFeedback = await this.feedbackRepo.findOne({
        where: { patientId: patientId, doctorId: doctorId },
      });
      if (existFeedback) {
        return { error: "You have already a feedback for this doctor" };
      }

      const feedback = this.feedbackRepo.create({
        patientId: patient.id,
        doctorId: doctor.id,
        rating: data.rating,
        comment: data.comment,
      });

      await this.feedbackRepo.save(feedback);

      doctor.rating = await this.calculateDoctorRating(doctor.id);
      await this.doctorRepo.save(doctor);

      return {
        message: "Feedback created successfully",
      };
    } catch (error) {
      console.error("Error during create feedback", error);
      return { error: "Internal server error" };
    }
  }

  async getFeedbacks(doctorId: number): Promise<ReadGetAllFeedbackDto> {
    try {
      const doctor = await this.doctorRepo.findOne({
        where: { id: doctorId },
      });
      if (!doctor) {
        return { error: "Doctor not found" };
      }
      const [allFeedback, totalFeedback] = await this.feedbackRepo
        .createQueryBuilder("feedback")
        .select([
          "feedback.id",
          "feedback.comment",
          "feedback.rating",
          "feedback.patientId",
          "feedback.createdAt",
        ])
        .where("feedback.doctorId = :doctorId", { doctorId: doctorId })
        .getManyAndCount();

      return {
        message:
          totalFeedback > 0
            ? "Feedbacks retrieved successfully"
            : "No feedback found.",
        response: allFeedback,
        totalFeedback,
      };
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      return { error: "Internal server error" };
    }
  }

  async updateFeedback(
    data: UpdateFeedbackDto,
    feedbackId: number,
    patientId: number
  ): Promise<{ message?: string; error?: string }> {
    try {
      const feedback = await this.feedbackRepo.findOne({
        where: { id: feedbackId },
      });
      if (!feedback) {
        return { error: "Feedback not found" };
      }

      if (feedback.patientId !== patientId) {
        return { error: "You are not authorized to update this feedback" };
      }

      const doctor = await this.doctorRepo.findOne({
        where: { id: feedback.doctorId },
      });
      if (!doctor) {
        return { error: "Doctor not found" };
      }
      Object.assign(feedback, data);

      await this.feedbackRepo.save(feedback);

      doctor.rating = await this.calculateDoctorRating(doctor.id);
      await this.doctorRepo.save(doctor);

      return {
        message: "Feedback updated successfully",
      };
    } catch (error) {
      console.error("Error during update feedback", error);
      return { error: "Internal server error" };
    }
  }

  async deleteFeedback(
    feedbackId: number,
    patientId: number
  ): Promise<{ error?: string; message?: string }> {
    try {
      const feedback = await this.feedbackRepo.findOne({
        where: { id: feedbackId },
      });
      if (!feedback) {
        return { error: "Feedback not found" };
      }

      if (feedback.patientId !== patientId) {
        return { error: "You are not authorized to delete this feedback" };
      }

      const doctor = await this.doctorRepo.findOne({
        where: { id: feedback.doctorId },
      });
      if (!doctor) {
        return { error: "Doctor not found" };
      }

      await this.feedbackRepo.remove(feedback);
      doctor.rating = await this.calculateDoctorRating(doctor.id);
      await this.doctorRepo.save(doctor);
      return { message: "Feedback removed successfully" };
    } catch (error) {
      console.error("Error during removing feedback", error);
      return { error: "Internal server error" };
    }
  }
  private async calculateDoctorRating(doctorId: number): Promise<number> {
    const [sumOfRatingsResult, rates] = await Promise.all([
      this.feedbackRepo
        .createQueryBuilder("feedback")
        .select("SUM(feedback.rating)", "sum")
        .where("feedback.doctorId = :doctorId", { doctorId })
        .getRawOne(),
      this.feedbackRepo.count({ where: { doctorId } }),
    ]);
    const sumOfRatings = sumOfRatingsResult?.sum || 0;
    return rates > 0 ? sumOfRatings / rates : 0;
  }
}
