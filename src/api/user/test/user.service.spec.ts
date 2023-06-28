import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@api/user/user.service';
import { UserRepository } from '../user.repository';
import { UserEntity } from '@libs/entity/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe('UserService', () => {
  let service: UserService;
  let repo: UserRepository;
  let jwt: JwtService;

  // mock repo
  const users: UserEntity[] = [];
  const fakeRepo: Partial<UserRepository> = {
    create(data: Partial<UserEntity>) {
      const user = new UserEntity();
      const keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++) {
        user[data[`${keys[i]}`]] = data[`${keys[i]}`];
      }
      return user;
    },
    save(data: UserEntity) {
      users.push(data);
      return;
    },
    findByName(userName: string): Promise<UserEntity[]> | string {
      const user = users.filter((value) => {
        if (value.userName === userName) {
          return value;
        }
      });
      return Promise.resolve(user);
    },
  };

  // mock jwt
  const fakeJwt = {
    signAsync(payload: object): Promise<string> {
      return Promise.resolve(`${payload}`);
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        ConfigService,
        {
          provide: UserRepository,
          useValue: fakeRepo,
        },
        { provide: JwtService, useValue: fakeJwt },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
