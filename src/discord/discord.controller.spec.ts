import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';
import { ConfigModule } from '@nestjs/config';
import { AstraModule } from '@cahllagerfeld/nestjs-astra';
import { AstraConfigService } from '../astra/astra-config.service';
import { AstraService } from '../astra/astra.service';
import { AstraApiModule } from '../astra/astra-api.module';

describe('DiscordController', () => {
  let controller: DiscordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AstraApiModule,
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
      providers: [DiscordService, AstraService],
    }).compile();

    controller = module.get<DiscordController>(DiscordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
