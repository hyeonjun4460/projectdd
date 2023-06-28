import { Expose, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class WeightResponseDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsNumber()
  afterWake: number;

  @Expose()
  @IsNumber()
  beforeSleep: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  @IsNumber()
  userId: number;
}
