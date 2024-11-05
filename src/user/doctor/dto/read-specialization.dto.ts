import { Exclude } from "class-transformer";

// this dto should be use in dr module for exclude fields
export class ReadSpecializationDto {
  value?: string;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  @Exclude()
  attributeId?: number;

  @Exclude()
  id?: number;
}
