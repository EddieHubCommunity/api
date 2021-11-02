import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { StandupService } from './standup.service';

describe('StandupService', () => {
  let service: StandupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
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
