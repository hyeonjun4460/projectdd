import { UserEntity } from '@libs/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}
  async findByName(userName: string): Promise<UserEntity[] | string> {
    try {
      return await this.repo.find({ where: { userName } });
    } catch (err) {
      return 'db error';
    }
  }
  async save(data: UserEntity): Promise<UserEntity | string> {
    try {
      return await this.repo.save(data);
    } catch (err) {
      return 'db error';
    }
  }
}
