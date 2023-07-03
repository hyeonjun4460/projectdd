console.log(__dirname);
import { Test, TestingModule } from '@nestjs/testing';
import { WeightController } from '../../../../src/api/weight/weight.controller';

describe('WeightController', () => {
  let controller: WeightController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeightController],
    }).compile();

    controller = module.get<WeightController>(WeightController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
