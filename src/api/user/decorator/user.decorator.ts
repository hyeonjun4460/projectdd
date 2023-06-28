import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const User = createParamDecorator(
  (data: never, context: ExecutionContext): number => {
    const response = context.switchToHttp().getResponse();
    return response.locals.user;
  },
);
