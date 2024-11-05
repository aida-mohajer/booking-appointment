import { AppDataSource } from "../data-source";
import { City } from "../entity/city.entity";
import { CreateCityDto } from "./dto/create-city.dto";
import { ReadGetCitiesDto } from "./dto/read-get-citites.dto";

export class CityService {
  constructor(private cityRepo = AppDataSource.getRepository(City)) {}
  async createCity(
    data: CreateCityDto
  ): Promise<{ message?: string; error?: string }> {
    try {
      const existCity = await this.cityRepo.findOne({
        where: { value: data.value },
      });
      if (existCity) {
        return { error: "This city added before" };
      }

      const city = this.cityRepo.create({
        value: data.value,
      });

      await this.cityRepo.save(city);

      return {
        message: "City created successfully",
      };
    } catch (error) {
      console.error("Error during creating city:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async getCities(): Promise<ReadGetCitiesDto> {
    try {
      const cities = await this.cityRepo.find({
        select: ["id", "value"],
      });

      return { response: cities };
    } catch (error) {
      console.error("Error during retrieve cities:", error);
      return { error: "An unexpected error occurred" };
    }
  }

  async removeCity(
    cityId: number
  ): Promise<{ message?: string; error?: string }> {
    try {
      const city = await this.cityRepo.findOne({ where: { id: cityId } });
      if (!city) {
        return { error: "City not found" };
      }

      await this.cityRepo.remove(city);

      return {
        message: "City removed successfully",
      };
    } catch (error) {
      console.error("Error during removing city:", error);
      return { error: " An unexpected error occured" };
    }
  }
}
