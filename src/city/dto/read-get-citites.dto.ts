import { City } from "../../entity/city.entity";

export class ReadGetCitiesDto {
  response?: City[];
  error?: string;
}
