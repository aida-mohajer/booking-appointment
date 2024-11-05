import { Appointment } from "../../entity/appointment.entity";

export class ReadGetAppointmentsByDrDto {
  response?: Appointment[];
  totalPages?: number;
  totalAppointments?: number;
  error?: string;
  message?: string;
}
