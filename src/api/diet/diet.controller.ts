import { Controller, Param, Post, Body } from '@nestjs/common';
import { CreateDietParamDto } from './dto/create.diet.param.dto';
import { CreateDietBodyDto } from './dto/create.diet.body.dto';

@Controller('diet')
export class DietController {
  @Post('/:year/:month/:day/:category')
  createDiet(
    @Param() param: CreateDietParamDto,
    @Body() body: CreateDietBodyDto,
  ) {
    return { param, body };
  }
}
