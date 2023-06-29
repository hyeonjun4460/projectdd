import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetRecordQueryDto } from './dto/get-record.query.dto';
import { RecordService } from './record.service';
import { AuthGuard } from '@api/user/guard/auth.guard';
import { User } from '@api/user/decorator/user.decorator';
import { DateTimeUtil } from '@libs/utils/DateTime/DateTime.util';
import { DietResponseDto } from '@api/diet/dto/response/create-diet.response.dto';
import { WeightResponseDto } from '@api/weight/dto/response/weight.response.dto';
import { ResponseDto } from '@libs/dto/response.dto';
import { GetRecordReponseDto } from './dto/response/get-record.response.dto';

@Controller('record')
export class RecordController {
  constructor(private readonly service: RecordService) {}
  @UseGuards(AuthGuard)
  @Get()
  async getRecord(
    @Query() query: GetRecordQueryDto,
    @User() user: { id: number },
  ): Promise<ResponseDto<GetRecordReponseDto>> {
    const { depth, year, month } = query;
    let day: number;
    if (depth === 'month') {
      day = 1;
    }
    if (depth === 'week') {
      day = query.day;
    }

    const result = await this.service.find(
      depth,
      DateTimeUtil.ofLocalDate(year, month, day),
      user,
    );

    if (result === 'db error') {
      throw new InternalServerErrorException('db error');
    }

    return new ResponseDto(
      'get success',
      new GetRecordReponseDto(
        {
          weight: result.weight.map((value) => {
            return new WeightResponseDto(value);
          }),
          diet: result.diet.map((value) => {
            return new DietResponseDto(value);
          }),
        },
        user,
      ),
    );
  }
}
