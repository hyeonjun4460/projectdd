import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UserRepository } from './user.repository';
import { UserEntity } from '@libs/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { DataMapperService } from '@libs/utils/mapper/data-mapper.service';

const scrypt = promisify(_scrypt);
@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly repo: UserRepository,
    private readonly jwt: JwtService,
    private readonly mapper: DataMapperService,
  ) {}

  async createUser(
    userName: string,
    originPassword: string,
    birth: string,
    admin: boolean,
  ): Promise<void | string> {
    // 비즈니스 로직?
    const user = await this.repo.findByName(userName);
    if (user.length !== 0) {
      return 'exist';
    }
    if (typeof user === 'string') {
      return 'db error';
    }

    const byte: number = this.configService.get('HASH_BYTE');
    const salt = randomBytes(Number(byte)).toString(
      this.configService.get('HASH_INCODING'),
    );

    const len = this.configService.get('HASH_LEN');
    const hash = (await scrypt(originPassword, salt, Number(len))) as Buffer;
    const password =
      salt + '.' + hash.toString(this.configService.get('HASH_INCODING'));

    const data = this.mapper.mapUser({ userName, password, birth, admin });
    //   여기서부턴 db 작업
    this.repo.save(data);
  }

  async login(
    userName: string,
    originPassword: string,
  ): Promise<{ userName: string; token: string } | string> {
    const [user] = (await this.repo.findByName(userName)) as UserEntity[];

    if (typeof user === 'string') {
      return 'db error';
    }
    if (!user) {
      return 'not found';
    }
    const len = this.configService.get('HASH_LEN');

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(originPassword, salt, Number(len))) as Buffer;

    if (storedHash !== hash.toString(this.configService.get('HASH_INCODING'))) {
      return 'wrong access';
    }
    // 토큰 생성
    const payload = { id: user.id };
    const token = await this.jwt.signAsync(payload);
    return {
      userName,
      token,
    };
  }
}
