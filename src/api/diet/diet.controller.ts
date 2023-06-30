import {
  Controller,
  Param,
  Post,
  Body,
  UseGuards,
  BadRequestException,
  InternalServerErrorException,
  Get,
  ParseIntPipe,
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
    const { diet, presignedUrl } = await this.service.create(
      user,
      date,
      dietTime,
      param.category,
      body.foodName,
      body.foodAmount,
      body.place,
      body.impression,
      body.have,
      body.fileUpload,
    );
    if (typeof diet === 'string') {
      if (diet === 'wrong access') {
        throw new BadRequestException('wrong access');
      }
      if (diet === 'db error') {
        throw new InternalServerErrorException('db error');
      }
    } else {
      return new ResponseDto(
        'insert success',
        new DietResponseDto({ diet, presignedUrl }),
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getDiet(
    @Param('id', ParseIntPipe) id: number,
    @User() user: { id: number },
  ) {
    const diet = await this.service.findOne(id, user);

    if (typeof diet === 'string') {
      throw new InternalServerErrorException('db error');
    }
    if (!diet) {
      throw new BadRequestException('wrong access');
    }
    return new ResponseDto('get success', new DietResponseDto({ diet }));
  }
}
