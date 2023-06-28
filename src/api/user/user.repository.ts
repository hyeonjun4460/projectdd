import { UserEntity } from '@libs/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}

  create(data: Partial<UserEntity>): UserEntity {
    return this.repo.create(data);
  }

  findByName(userName: string): Promise<UserEntity[]> | string {
    try {
      return this.repo.find({ where: { userName } });
    } catch (err) {
      return 'db error';
    }
  }
  save(data: UserEntity): void | string {
    try {
      this.repo.save(data);
    } catch (err) {
      return 'db error';
    }
  }
}
