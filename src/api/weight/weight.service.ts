import { WeightRepository } from './weight.repository';
import { Injectable } from '@nestjs/common';
import { DataMapperService } from '@libs/utils/mapper/data-mapper.service';

@Injectable()
export class WeightService {
  constructor(
    private readonly mapper: DataMapperService,
    private readonly repo: WeightRepository,
  ) {}
  async save(
    userId: { id: number },
    date: string,
    body: { afterWake?: number; beforeSleep?: number },
  ) {
    const user = this.mapper.mapUser(userId);
    const data = this.mapper.mapWeight({ user, date, ...body });
    const result = await this.repo.save(data);
    return result;
  }
}
