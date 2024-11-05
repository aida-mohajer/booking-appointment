import { Patient } from "../../../entity/patient.entity";

export class ReadGetAllPatientsDto {
  response?: Patient[];
  totalPages?: number;
  totalPatients?: number;
  error?: string;
  message?: string;
}
