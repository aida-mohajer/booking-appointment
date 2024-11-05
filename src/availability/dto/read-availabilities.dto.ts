import { Availability } from "../../entity/availability.entity";

export class ReadAvailabilitiesDto {
  response?: Availability[];
  totalPages?: number;
  totalAvailability?: number;
  error?: string;
  message?: string;
}
