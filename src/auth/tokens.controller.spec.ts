import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

describe('AuthController', () => {
  let controller: TokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'Test' })],
      controllers: [TokensController],
      providers: [TokensService],
    }).compile();

    controller = module.get<TokensController>(TokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
