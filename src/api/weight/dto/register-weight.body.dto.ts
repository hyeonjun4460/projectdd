import { IsNumber, IsOptional, Min } from 'class-validator';
export class RegisterWeightBodyDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  afterWake?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  beforeSleep?: number;
}
