import { Test, TestingModule } from '@nestjs/testing';
import { StandupController } from './standup.controller';

describe('StandupController', () => {
  let controller: StandupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StandupController],
    }).compile();

    controller = module.get<StandupController>(StandupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
