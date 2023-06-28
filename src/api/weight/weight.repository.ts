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

  async findOneById(id: number): Promise<string | WeightEntity> {
    try {
      return await this.repo
        .createQueryBuilder('weight')
        .leftJoinAndSelect('weight.user', 'user')
        .select()
        .where('weight.id = :id', { id })
        .getOne();
    } catch (err) {
      console.log(err);
      return 'db error';
    }
  }

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

  async update(id: number, data: WeightEntity): Promise<string | void> {
    try {
      await this.repo.update(id, data);
    } catch (err) {
      console.log(err);
      return 'db error';
    }
  }
}
