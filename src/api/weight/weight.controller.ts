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
} from '@nestjs/common';
import { User } from '@api/user/decorator/user.decorator';
import { DateTimeUtil } from '@libs/utils/DateTime/DateTime.util';
import { ResponseDto } from '@libs/dto/response.dto';
import { Serialize } from '@libs/decorator/serialize.decorator';
import { WeightResponseDto } from './dto/response/weight.response.dto';
@Controller('weight')
export class WeightController {
  constructor(private readonly service: WeightService) {}

  @Serialize(WeightResponseDto)
  @UseGuards(AuthGuard)
  @Post('/:year/:month/:day')
  async registerWeight(
    @Param() params: registerWeighParamtDto,
    @Body() body: RegisterWeightBodyDto,
    @User() user: { id: number },
  ): Promise<ResponseDto<WeightResponseDto | any>> {
    // param을 localdate로 깎기
    const localdate = DateTimeUtil.ofLocalDate(
      params.year,
      params.month,
      params.day,
    );
    const date = DateTimeUtil.toString(localdate);

    const result = await this.service.save(user, date, body);
    // 예외처리
    if (result === 'db error') {
      throw new InternalServerErrorException('db error');
    }
    // 삽입
    return { message: 'insert success', data: result };
  }
}
