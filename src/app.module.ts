import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from '@api/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigOptions } from '@libs/config/db/database.config';
import { APP_PIPE } from '@nestjs/core';
import { WeightModule } from '@api/weight/weight.module';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfigOptions),
    WeightModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true, transform: true }),
    },
  ],
})
export class AppModule {}
