import { IsBoolean, IsNumber, IsString, Max, Min } from 'class-validator';
export class CreateDietBodyDto {
  @IsString()
  foodName: string;

  @IsNumber()
  @Min(0)
  foodAmount: number;

  @IsNumber()
  @Min(0)
  @Max(23)
  hour: number;

  @IsNumber()
  @Min(0)
  @Max(60)
  min: number;

  @IsString()
  place: string;

  @IsString()
  impression: string;

  @IsBoolean()
  have: boolean;

  @IsBoolean()
  fileUpload: boolean;
}
