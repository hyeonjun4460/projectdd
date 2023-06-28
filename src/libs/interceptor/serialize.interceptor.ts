import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: ClassConstructor<any>) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map(
        (value: {
          message: string;
          data?: typeof this.dto | (typeof this.dto)[];
          statusCode?: number;
        }) => {
          value.statusCode = response.statusCode;
          value.data = plainToClass(this.dto, value.data);
          return value;
        },
      ),
    );
  }
}
