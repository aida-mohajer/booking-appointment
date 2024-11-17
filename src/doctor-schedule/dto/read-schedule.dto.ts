import { DoctorSchedule } from "../../entity/doctorSchedule.entity";

export class ReadScheduleDto {
  response?: DoctorSchedule[];
  error?: string;
  message?: string;
}
