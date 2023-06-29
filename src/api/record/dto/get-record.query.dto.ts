import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsString, Max, Min } from 'class-validator';

const dietCategory = ['breakfast', 'lunch', 'dinner'] as const;
type DietCategory = 'breakfast' | 'lunch' | 'dinner';

const depthOption = ['week', 'month'] as const;
type Depth = 'week' | 'month';
export class GetRecordQueryDto {
  @IsIn(depthOption)
  @IsString()
  depth: Depth;

  @Transform(({ value }) => Number(value))
  @Min(0)
  @Max(3000)
  @IsNumber()
  year: number;

  @Transform(({ value }) => Number(value))
  @Min(1)
  @Max(12)
  @IsNumber()
  month: number;

  @Transform(({ value }) => Number(value))
  @Min(1)
  @Max(31)
  @IsNumber()
  day: number;

  @IsIn(dietCategory)
  category: DietCategory;
}
