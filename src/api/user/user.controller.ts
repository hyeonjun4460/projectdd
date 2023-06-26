import {
  BadRequestException,
  Body,
  Controller,
  Post,
  InternalServerErrorException,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/request/create.user.dto';
import { DateTimeUtil } from '@libs/utils/DateTime/DateTime.util';
import { UserService } from './user.service';
import { LoginDto } from './dto/request/login.dto';
import { Response } from 'express';

@Controller('auth')
export class UserController {
  constructor(private readonly service: UserService) {}
  @Post('/signup')
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

  @Post('/signin')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.service.login(body.userName, body.password);
    if (typeof data === 'string') {
      if (data === 'not found') {
        throw new BadRequestException('user not found');
      }
      if (data === 'db error') {
        throw new InternalServerErrorException('db error');
      }
      if (data === 'wrong access') {
        throw new BadRequestException('wrong access');
      }
    } else {
      const { userName, token } = data;
      res.cookie('token', token);
      return userName;
    }
  }
}
