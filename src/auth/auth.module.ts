import { Module } from '@nestjs/common';
import { TokenStrategy } from './token.strategy';
import { ValidationService } from './header-validation.service';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AstraService } from '../astra/astra.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    TokenStrategy,
    ValidationService,
    TokensService,
    JwtStrategy,
    AstraService,
  ],
  exports: [ValidationService],
  controllers: [TokensController],
})
export class AuthModule {}
