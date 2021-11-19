import { ConfigModule } from '@nestjs/config';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { MongooseConfigService } from '../environment/mongo-config.service';
import { DiscordService } from './discord.service';
import { Discord, DiscordSchema } from './schemas/discord.schema';

describe('DiscordService', () => {
  let service: DiscordService;
  let connection: Connection;

  afterEach(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useClass: MongooseConfigService,
        }),
        MongooseModule.forFeature([
          { name: Discord.name, schema: DiscordSchema },
        ]),
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [DiscordService],
    }).compile();

    service = module.get<DiscordService>(DiscordService);
    connection = await module.get(getConnectionToken());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
