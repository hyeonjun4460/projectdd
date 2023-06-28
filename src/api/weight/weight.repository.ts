import { WeightEntity } from '@libs/entity/weight.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WeightRepository {
  constructor(
    @InjectRepository(WeightEntity)
    private readonly repo: Repository<WeightEntity>,
  ) {}

  async save(data: WeightEntity): Promise<string | WeightEntity> {
    try {
      return await this.repo.save(data);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return 'wrong access';
      }
      return 'db error';
    }
  }
}
