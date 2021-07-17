import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';
import { ConfigModule } from '@nestjs/config';
import { AstraModule } from '@cahllagerfeld/nestjs-astra';
import { AstraConfigService } from '../astra/astra-config.service';

describe('DiscordController', () => {
  let controller: DiscordController;

  beforeEach(async () => {
    process.env.SECRET = 'Test';
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        AstraModule.forRootAsync({
          useClass: AstraConfigService,
        }),
        AstraModule.forFeature({
          namespace: 'eddiehub',
          collection: 'github',
        }),
      ],
      controllers: [DiscordController],
      providers: [DiscordService],
    }).compile();

    controller = module.get<DiscordController>(DiscordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
