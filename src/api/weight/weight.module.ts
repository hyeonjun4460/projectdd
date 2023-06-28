import { DataMapperModule } from '@libs/utils/mapper/data-mapper.module';
import { Module } from '@nestjs/common';
import { WeightController } from './weight.controller';
import { WeightService } from './weight.service';
import { JwtModule } from '@nestjs/jwt';
import { WeightRepository } from './weight.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeightEntity } from '@libs/entity/weight.entity';

@Module({
  imports: [
    DataMapperModule,
    JwtModule,
    TypeOrmModule.forFeature([WeightEntity]),
  ],
  controllers: [WeightController],
  providers: [WeightService, WeightRepository],
})
export class WeightModule {}
