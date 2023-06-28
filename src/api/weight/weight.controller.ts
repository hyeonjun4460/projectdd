import { RegisterWeightBodyDto } from './dto/register-weight.body.dto';
import { registerWeighParamtDto } from './dto/register-weight.params.dto';
import { WeightService } from './weight.service';
import { Controller, Param, Post, Body } from '@nestjs/common';

@Controller('weight')
export class WeightController {
  constructor(private readonly service: WeightService) {}

  @Post('/:year/:month/:day')
  registerWeight(
    @Param() params: registerWeighParamtDto,
    @Body() body: RegisterWeightBodyDto,
  ) {
    return { params, body };
    // body로 데이터 받기
    // 유저 토큰 받기(guards)
    // 유저 데코레이터로 토큰 체크하기
  }
}
