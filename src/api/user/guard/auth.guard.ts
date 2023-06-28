import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const token = request.cookies.token;
    // 토큰 validation
    // 실패 시 false
    // 성공 시 토큰 그대로 주기
    try {
      const payload: { userId: number } = this.jwt.verify(token, {
        secret: this.config.get('JWT_SECRET_KEY'),
      });
      response.locals.user = payload.userId;
      return true;
    } catch (err) {
      if (err.message === 'jwt expired') {
        throw new UnauthorizedException('not valid token');
      }
      throw new InternalServerErrorException('not valid token');
    }
  }
}
