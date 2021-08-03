import { AstraModule } from '@cahllagerfeld/nestjs-astra';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AstraConfigService } from '../astra/astra-config.service';
import { AstraService } from '../astra/astra.service';
import { AuthModule } from '../auth/auth.module';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';

describe('CalendarController', () => {
  let controller: CalendarController;

  beforeEach(async () => {
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
          collection: 'standup',
        }),
      ],
      controllers: [CalendarController],
      providers: [CalendarService, AstraService],
    }).compile();

    controller = module.get<CalendarController>(CalendarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
