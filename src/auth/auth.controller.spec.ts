import { AstraModule } from '@cahllagerfeld/nestjs-astra';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AstraApiModule } from '../astra/astra-api.module';
import { AstraConfigService } from '../astra/astra-config.service';
import { AstraService } from '../astra/astra.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AstraApiModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        JwtModule.register({ secret: 'Test' }),
        AstraModule.forRootAsync({
          useClass: AstraConfigService,
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, AstraService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
