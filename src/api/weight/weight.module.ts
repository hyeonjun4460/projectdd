import { Module } from '@nestjs/common';
import { WeightController } from './weight.controller';
import { WeightService } from './weight.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [WeightController],
  providers: [WeightService],
})
export class WeightModule {}
