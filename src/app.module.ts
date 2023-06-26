import { Module } from '@nestjs/common';
import { UserModule } from '@api/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from '@libs/config/db/database.config';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
