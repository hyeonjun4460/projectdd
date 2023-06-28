import { Expose } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class ResponseDto<T> {
  @Expose()
  @IsString()
  message: string;

  @Expose()
  @IsOptional()
  @IsObject()
  data?: T;

  @Expose()
  @IsNumber()
  @IsOptional()
  statusCode?: number;
}
