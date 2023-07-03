import { WeightEntity } from '@libs/entity/weight.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DeleteResult, Repository } from 'typeorm';

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

  async findBetweenDate(
    user: Partial<WeightEntity>,
    start: Partial<WeightEntity>,
    end: Partial<WeightEntity>,
  ): Promise<WeightEntity[] | string> {
    try {
      return this.repo.find({
        where: { date: Between(start.date, end.date), user },
        relations: {
          user: true,
        },
      });
    } catch (err) {
      return 'db error';
    }
  }

  async delete(
    user: Partial<WeightEntity>,
    weight: Partial<WeightEntity>,
  ): Promise<DeleteResult | string> {
    try {
      return this.repo.delete({ id: weight.id, user });
    } catch (err) {
      return 'db error';
    }
  }
}
