import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseConfigService } from '../environment/mongo-config.service';
import { Standup, StandupSchema } from './schemas/standup.schema';
import { StandupService } from './standup.service';

describe('StandupService', () => {
  let service: StandupService;

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
      providers: [StandupService],
    }).compile();

    service = module.get<StandupService>(StandupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
