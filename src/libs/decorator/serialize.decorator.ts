import { SerializeInterceptor } from '@libs/interceptor/serialize.interceptor';
import { UseInterceptors } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

export function Serialize(dto: ClassConstructor<any>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
