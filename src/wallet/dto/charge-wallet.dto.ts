import { IsInt, IsNumber, IsPositive } from "class-validator";

export class ChargeWalletDto {
  @IsNumber()
  @IsPositive()
  amount!: number;
}
