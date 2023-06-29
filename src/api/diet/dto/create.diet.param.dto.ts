import { Transform } from 'class-transformer';
import { IsIn, IsNumber, Max, Min } from 'class-validator';

const dietCategory = ['breakfast', 'lunch', 'dinner'] as const;
type DietCategory = 'breakfast' | 'lunch' | 'dinner';

export class CreateDietParamDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  @Max(3000)
  year: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  @Max(12)
  month: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  @Max(31)
  day: number;

  @IsIn(dietCategory)
  category: DietCategory;
}
