import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@libs/entity/user.entity';
import { Repository } from 'typeorm';
import { WeightEntity } from '@libs/entity/weight.entity';
@Injectable()
export class DataMapperService {
  constructor(
    @InjectRepository(UserEntity) private readonly user: Repository<UserEntity>,
    @InjectRepository(WeightEntity)
    private readonly weight: Repository<WeightEntity>,
  ) {}

  mapUser(data: Partial<UserEntity>): UserEntity {
    return this.user.create(data);
  }

  mapWeight(data: Partial<WeightEntity>): WeightEntity {
    return this.weight.create(data);
  }
}
