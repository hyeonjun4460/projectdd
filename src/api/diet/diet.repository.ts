import { DietEntity } from '@libs/entity/diet.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
}
