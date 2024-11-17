import { Hospital } from "../../entity/hospital.entity";

export class ReadGetHospitalsDto {
  response?: Hospital[];
  error?: string;
}
