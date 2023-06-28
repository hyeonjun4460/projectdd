import { IsDecimal, IsOptional } from 'class-validator';
export class RegisterWeightBodyDto {
  @IsDecimal()
  @IsOptional()
  afterWake: number;

  @IsDecimal()
  @IsOptional()
  beforeSleep: number;
}
