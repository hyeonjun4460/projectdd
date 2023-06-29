import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const User = createParamDecorator(
  (data: never, context: ExecutionContext): { id: number } => {
    const response = context.switchToHttp().getResponse();
    return response.locals.user;
  },
);
