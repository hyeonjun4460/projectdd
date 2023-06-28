import { Transform } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class registerWeighParamtDto {
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber()
  @Min(0)
  @Max(3000)
  year: number;

  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber()
  @Min(1)
  @Max(12)
  month: number;

  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber()
  @Min(1)
  @Max(31)
  day: number;
}
