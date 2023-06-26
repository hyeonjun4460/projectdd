import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UserRepository } from './user.repository';

const scrypt = promisify(_scrypt);
@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly repo: UserRepository,
  ) {}

  async createUser(
    userName: string,
    originPassword: string,
    birth: string,
    admin: boolean,
  ): Promise<void | string> {
    // 비즈니스 로직?
    const user = await this.repo.findByName(userName);
    console.log(user);
    if (user.length !== 0) {
      return 'exist';
    }

    const byte: number = this.configService.get('HASH_BYTE');
    const salt = randomBytes(Number(byte)).toString(
      this.configService.get('HASH_INCODING'),
    );

    const len = this.configService.get('HASH_LEN');
    const hash = (await scrypt(originPassword, salt, Number(len))) as Buffer;
    const password =
      salt + '.' + hash.toString(this.configService.get('HASH_INCODING'));

    const data = this.repo.create({ userName, password, birth, admin });
    //   여기서부턴 db 작업
    this.repo.save(data);
  }
}
