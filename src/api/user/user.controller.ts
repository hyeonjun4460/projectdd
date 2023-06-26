import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/request/create.user.dto';
import { DateTimeUtil } from '@libs/utils/DateTime/DateTime.util';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly service: UserService) {}
  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    const birth = DateTimeUtil.toString(
      DateTimeUtil.toLocalDate(new Date(body.birth)),
    );
    const result = await this.service.createUser(
      body.userName,
      body.password,
      birth,
      body.admin,
    );
    if (result === 'exist') {
      throw new BadRequestException('user exist');
    }
    return;
  }
}
