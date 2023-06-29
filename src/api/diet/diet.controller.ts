import {
  Controller,
  Param,
  Post,
  Body,
  UseGuards,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateDietParamDto } from './dto/create-diet.param.dto';
import { CreateDietBodyDto } from './dto/create-diet.body.dto';
import { DateTimeUtil } from '@libs/utils/DateTime/DateTime.util';
import { DietService } from './diet.service';
import { AuthGuard } from '@api/user/guard/auth.guard';
import { User } from '@api/user/decorator/user.decorator';
import { ResponseDto } from '@libs/dto/response.dto';
import { DietResponseDto } from './dto/response/create-diet.response.dto';

@Controller('diet')
export class DietController {
  constructor(private readonly service: DietService) {}

  @UseGuards(AuthGuard)
  @Post('/:year/:month/:day/:category')
  async createDiet(
    @Param() param: CreateDietParamDto,
    @Body() body: CreateDietBodyDto,
    @User() user: { id: number },
  ): Promise<ResponseDto<DietResponseDto>> {
    const dietTime = DateTimeUtil.toString(
      DateTimeUtil.ofLocalTime(body.hour, body.min),
    );
    const date = DateTimeUtil.toString(
      DateTimeUtil.ofLocalDate(param.year, param.month, param.day),
    );
    const data = await this.service.create(
      user,
      date,
      dietTime,
      param.category,
      body.foodName,
      body.foodAmount,
      body.place,
      body.impression,
      body.have,
    );
    if (typeof data === 'string') {
      if (data === 'wrong access') {
        throw new BadRequestException('wrong access');
      }
      if (data === 'db error') {
        throw new InternalServerErrorException('db error');
      }
    } else {
      return new ResponseDto('insert success', new DietResponseDto(data));
    }
  }
}
