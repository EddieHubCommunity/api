import { Test, TestingModule } from '@nestjs/testing';
import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';
import { ConfigModule } from '@nestjs/config';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from '../environment/mongo-config.service';
import { Discord, DiscordSchema } from './schemas/discord.schema';
import { Connection } from 'mongoose';

describe('DiscordController', () => {
  let controller: DiscordController;
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
      controllers: [DiscordController],
      providers: [DiscordService],
    }).compile();

    controller = module.get<DiscordController>(DiscordController);
    connection = await module.get(getConnectionToken());
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
