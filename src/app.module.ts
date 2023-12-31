import {
  Module,
  ValidationPipe,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserModule } from '@api/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigOptions } from '@libs/config/db/database.config';
import { APP_PIPE, APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { WeightModule } from '@api/weight/weight.module';
import { DataMapperModule } from '@libs/utils/mapper/data-mapper.module';
import { DietModule } from '@api/diet/diet.module';
import { RecordModule } from '@api/record/record.module';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfigOptions),
    WeightModule,
    DataMapperModule,
    DietModule,
    RecordModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true, transform: true }),
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: new ClassSerializerInterceptor(new Reflector()),
    },
  ],
})
export class AppModule {}
