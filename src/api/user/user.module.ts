import { Module } from '@nestjs/common';
import { UserController } from '@api/user/user.controller';
import { UserService } from '@api/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@libs/entity/user.entity';
import { UserRepository } from './user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRE_TIME') },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [JwtModule],
})
export class UserModule {}
