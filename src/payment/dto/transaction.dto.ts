import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class TransactionDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  patientId!: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  appointmentId!: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  doctorId!: number;
}
