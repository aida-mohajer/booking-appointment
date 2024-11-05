import { Appointment } from "../../entity/appointment.entity";

export class ReadGetAppointmentsByPatientDto {
  response?: Appointment[];
  error?: string;
}
