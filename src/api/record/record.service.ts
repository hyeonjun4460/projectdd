import { DateTimeUtil } from '@libs/utils/DateTime/DateTime.util';
import { DietRepository } from '@api/diet/diet.repository';
import { WeightRepository } from '@api/weight/weight.repository';
import { LocalDate } from '@js-joda/core';
import { DataMapperService } from '@libs/utils/mapper/data-mapper.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecordService {
  constructor(
    private readonly mapper: DataMapperService,
    private readonly diet: DietRepository,
    private readonly weight: WeightRepository,
  ) {}
  async find(
    depth: 'week' | 'month',
    dateOption: LocalDate,
    userId: { id: number },
  ) {
    const user = this.mapper.mapUser(userId);

    let startDate: string;
    let endDate: string;
    if (depth === 'week') {
      startDate = DateTimeUtil.toString(dateOption.minusDays(7));
      endDate = DateTimeUtil.toString(dateOption);
    }
    if (depth === 'month') {
      startDate = DateTimeUtil.toString(dateOption);
      endDate = DateTimeUtil.toString(dateOption.plusMonths(1));
    }
    const dietStartDate = this.mapper.mapDiet({ date: startDate });
    const dietEndDate = this.mapper.mapDiet({ date: endDate });

    const weightStartDate = this.mapper.mapWeight({ date: startDate });
    const weightEndDate = this.mapper.mapWeight({ date: endDate });

    const diet = await this.diet.findBetweenDate(
      user,
      dietStartDate,
      dietEndDate,
    );

    const weight = await this.weight.findBetweenDate(
      user,
      weightStartDate,
      weightEndDate,
    );
    if (typeof diet === 'string' || typeof weight === 'string') {
      return 'db error';
    }
    return { diet, weight };
  }
}
