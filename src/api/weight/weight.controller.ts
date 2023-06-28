import { AuthGuard } from '@api/user/guard/auth.guard';
import { RegisterWeightBodyDto } from './dto/register-weight.body.dto';
import { registerWeighParamtDto } from './dto/register-weight.params.dto';
import { WeightService } from './weight.service';
import {
  Controller,
  Param,
  Post,
  Body,
  UseGuards,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { User } from '@api/user/decorator/user.decorator';
import { DateTimeUtil } from '@libs/utils/DateTime/DateTime.util';

@Controller('weight')
export class WeightController {
  constructor(private readonly service: WeightService) {}

  @UseGuards(AuthGuard)
  @Post('/:year/:month/:day')
  async registerWeight(
    @Param() params: registerWeighParamtDto,
    @Body() body: RegisterWeightBodyDto,
    @User() user: { id: number },
  ): Promise<void> {
    // param을 localdate로 깎기
    const localdate = DateTimeUtil.ofLocalDate(
      params.year,
      params.month,
      params.day,
    );
    const date = DateTimeUtil.toString(localdate);

    // body, 깎은 localdate, user 값 넣기

    const result = await this.service.save(user, date, body);
    if (result === 'db error') {
      throw new InternalServerErrorException('db error');
    }
    if (result === 'duplicated error') {
      throw new BadRequestException('duplicated error');
    }
    return;
    // body로 데이터 받기
    // 유저 토큰 받기(guards)
    // 유저 데코레이터로 토큰 체크하기
  }
}
