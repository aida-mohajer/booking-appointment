import { IsInt, IsNumber, IsPositive } from "class-validator";

export class ChargeWalletDto {
  @IsInt()
  @IsPositive()
  patientId!: number;
  @IsNumber()
  @IsPositive()
  amount!: number;
}
