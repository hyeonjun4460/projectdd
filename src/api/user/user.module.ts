import { Module } from '@nestjs/common';
import { UserController } from '@api/user/user.controller';
import { UserService } from '@api/user/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
