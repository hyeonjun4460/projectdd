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
import { LoginResponseDto } from './dto/response/login.response.dto';
import { ResponseDto } from '@libs/dto/response.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto): Promise<ResponseDto<never>> {
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
    return new ResponseDto('create user');
  }

  @Post('/signin')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseDto<LoginResponseDto>> {
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
      const { user, token } = data;
      res.cookie('token', token);
      return new ResponseDto('login success', new LoginResponseDto(user));
    }
  }
}
