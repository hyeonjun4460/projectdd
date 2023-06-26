import { UserEntity } from '@libs/entity/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const configOptions: {
  dev: TypeOrmModuleOptions;
  test: TypeOrmModuleOptions;
} = {
  dev: {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DEV_NAME,
    entities: [UserEntity],
    timezone: 'local',
    migrationsTableName: 'migration',
    migrations: ['./migration/*.js'],
  },
  test: {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_TEST_NAME,
    entities: [UserEntity],
    timezone: 'local',
  },
};
export const databaseConfigOptions: TypeOrmModuleOptions =
  configOptions[process.env.NODE_ENV];
