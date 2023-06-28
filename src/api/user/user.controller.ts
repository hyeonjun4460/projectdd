import {
  BadRequestException,
  Body,
  Controller,
  Post,
  InternalServerErrorException,
  Res,
  Get,
} from '@nestjs/common';
import { CreateUserDto } from './dto/request/create.user.dto';
import { DateTimeUtil } from '@libs/utils/DateTime/DateTime.util';
import { UserService } from './user.service';
import { LoginDto } from './dto/request/login.dto';
import { Response } from 'express';
import { Serialize } from '@libs/decorator/serialize.decorator';
import { LoginResponseDto } from './dto/response/login.response.dto';
import { ResponseDto } from '@libs/dto/response.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Serialize(LoginResponseDto)
  @Get()
  test(): ResponseDto<LoginResponseDto> {
    return { data: { userName: 'hi' }, message: 'there' };
  }
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

  @Serialize(LoginResponseDto)
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
      const { userName, token } = data;
      res.cookie('token', token);
      return { data: { userName }, message: 'login success' };
    }
  }
}
