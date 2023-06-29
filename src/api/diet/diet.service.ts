import { DataMapperService } from '@libs/utils/mapper/data-mapper.service';
import { Injectable } from '@nestjs/common';
import { DietRepository } from './diet.repository';

@Injectable()
export class DietService {
  constructor(
    private readonly mapper: DataMapperService,
    private readonly repo: DietRepository,
  ) {}
  async create(
    userId: { id: number },
    date: string,
    time: string,
    category: 'breakfast' | 'lunch' | 'dinner',
    foodName: string,
    foodAmount: number,
    place: string,
    impression: string,
    have: boolean,
  ) {
    const user = this.mapper.mapUser(userId);
    const diet = this.mapper.mapDiet({ user, date, have, category });
    if (have) {
      Object.assign(diet, {
        time,
        foodName,
        foodAmount,
        place,
        have,
        impression,
      });
    }
    return await this.repo.create(diet);
  }
}
