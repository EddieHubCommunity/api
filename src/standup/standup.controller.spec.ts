import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { StandupController } from './standup.controller';
import { StandupService } from './standup.service';

describe('StandupController', () => {
  let controller: StandupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      controllers: [StandupController],
      providers: [StandupService],
    }).compile();

    controller = module.get<StandupController>(StandupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
