import { Module } from '@nestjs/common';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DietEntity } from '@libs/entity/diet.entity';
import { WeightEntity } from '@libs/entity/weight.entity';
import { DataMapperModule } from '@libs/utils/mapper/data-mapper.module';
import { JwtModule } from '@nestjs/jwt';
import { WeightModule } from '@api/weight/weight.module';
import { DietModule } from '@api/diet/diet.module';

@Module({
  imports: [
    WeightModule,
    DietModule,
    DataMapperModule,
    JwtModule,
    TypeOrmModule.forFeature([DietEntity, WeightEntity]),
  ],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
