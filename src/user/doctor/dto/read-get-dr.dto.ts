import { City } from "../../../entity/city.entity";
import { Specialization } from "../../../entity/specialization.entity";

export class ReadGetDrDto {
  name?: string;
  lastName?: string;
  contactNumber?: string;
  address?: string;
  email?: string;
  bio?: string;
  HIN?: number;
  degree?: string;
  city?: City;
  imageName?: string;
  rating?: number;
  specializations?: Specialization[];
  error?: string;
}
