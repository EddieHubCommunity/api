import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseConfigService } from '../environment/mongo-config.service';
import { Standup, StandupSchema } from './schemas/standup.schema';
import { StandupController } from './standup.controller';
import { StandupService } from './standup.service';

describe('StandupController', () => {
  let controller: StandupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRootAsync({
        useClass: MongooseConfigService,
      }),
      MongooseModule.forFeature([
        { name: Standup.name, schema: StandupSchema },
      ]),
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
