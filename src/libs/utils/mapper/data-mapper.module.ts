import { Module } from '@nestjs/common';
import { DataMapperService } from './data-mapper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@libs/entity/user.entity';
import { WeightEntity } from '@libs/entity/weight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WeightEntity])],
  providers: [DataMapperService],
  exports: [DataMapperService],
})
export class DataMapperModule {}
