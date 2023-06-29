import { DietEntity } from '@libs/entity/diet.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

@Injectable()
export class DietRepository {
  constructor(
    @InjectRepository(DietEntity) private readonly repo: Repository<DietEntity>,
  ) {}

  async create(data: DietEntity): Promise<DietEntity | string> {
    try {
      return this.repo.save(data);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return 'wrong access';
      }
      return 'db error';
    }
  }
  async findOne(data: Partial<DietEntity>): Promise<DietEntity | string> {
    try {
      return this.repo
        .createQueryBuilder('diet')
        .select()
        .leftJoinAndSelect('diet.user', 'user')
        .where('diet.id = :id', { id: data.id })
        .andWhere('diet.user = :user', { user: data.user.id })
        .getOne();
    } catch (err) {
      return 'db error';
    }
  }

  //  - 7까지 뿌려주는 거로
  async findBetweenDate(
    user: Partial<DietEntity>,
    start: Partial<DietEntity>,
    end: Partial<DietEntity>,
  ): Promise<DietEntity[] | string> {
    try {
      return this.repo.find({
        where: { date: Between(start.date, end.date), user: user.user },
        relations: {
          user: true,
        },
      });
    } catch (err) {
      return 'db error';
    }
  }
}
