import { Module } from '@nestjs/common';
import { DietController } from './diet.controller';
import { DietService } from './diet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DietEntity } from '@libs/entity/diet.entity';
import { DataMapperModule } from '@libs/utils/mapper/data-mapper.module';
import { JwtModule } from '@nestjs/jwt';
import { DietRepository } from './diet.repository';

@Module({
  imports: [
    DataMapperModule,
    JwtModule,
    TypeOrmModule.forFeature([DietEntity]),
  ],
  controllers: [DietController],
  providers: [DietService, DietRepository],
})
export class DietModule {}
