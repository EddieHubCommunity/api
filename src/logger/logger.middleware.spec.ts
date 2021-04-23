import { ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './logger.middleware';

describe('LoggerMiddleware', () => {
  const config: ConfigService = new ConfigService();
  it('should be defined', () => {
    expect(new LoggerMiddleware(config)).toBeDefined();
  });
});
