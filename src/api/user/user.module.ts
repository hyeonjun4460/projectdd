import { Module } from '@nestjs/common';
import { UserController } from '@api/user/user.controller';
import { UserService } from '@api/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@libs/entity/user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
