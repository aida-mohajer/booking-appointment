import { Specialization } from "../../entity/specialization.entity";

export class ReadGetSpecializationsDto {
  response?: Specialization[];
  error?: string;
}
