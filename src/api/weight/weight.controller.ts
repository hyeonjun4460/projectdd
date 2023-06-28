import { AuthGuard } from '@api/user/guard/auth.guard';
import { RegisterWeightBodyDto } from './dto/register-weight.body.dto';
import { registerWeighParamtDto } from './dto/register-weight.params.dto';
import { WeightService } from './weight.service';
import { Controller, Param, Post, Body, UseGuards } from '@nestjs/common';
import { User } from '@api/user/decorator/user.decorator';

@Controller('weight')
export class WeightController {
  constructor(private readonly service: WeightService) {}

  @UseGuards(AuthGuard)
  @Post('/:year/:month/:day')
  registerWeight(
    @Param() params: registerWeighParamtDto,
    @Body() body: RegisterWeightBodyDto,
    @User() user: number,
  ) {
    return { user, params, body };
    // body로 데이터 받기
    // 유저 토큰 받기(guards)
    // 유저 데코레이터로 토큰 체크하기
  }
}
