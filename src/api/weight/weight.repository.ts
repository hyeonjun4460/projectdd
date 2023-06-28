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

  create(data: Partial<WeightEntity>) {
    return this.repo.create(data);
  }
  async save(data: WeightEntity): Promise<void | string> {
    try {
      await this.repo.insert(data);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        await this.repo
          .createQueryBuilder()
          .update()
          .where('date = :date', { date: data.date })
          .andWhere('user = :user', { user: data.user.id })
          .set(data)
          .execute();
        return;
      }
      return 'db error';
    }
  }
}
