import { AstraModule } from '@cahllagerfeld/nestjs-astra';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AstraApiModule } from '../astra/astra-api.module';
import { AstraConfigService } from '../astra/astra-config.service';
import { AstraService } from '../astra/astra.service';
import { AuthModule } from '../auth/auth.module';
import { StandupController } from './standup.controller';
import { StandupService } from './standup.service';

describe('StandupController', () => {
  let controller: StandupController;

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
          collection: 'standup',
        }),
      ],
      controllers: [StandupController],
      providers: [StandupService, AstraService],
    }).compile();

    controller = module.get<StandupController>(StandupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
