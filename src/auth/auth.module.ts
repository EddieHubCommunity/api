import { Module } from '@nestjs/common';
import { TokenStrategy } from './token.strategy';
import { ValidationService } from './header-validation.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AstraService } from '../astra/astra.service';
import { AstraApiModule } from '../astra/astra-api.module';

@Module({
  imports: [
    AstraApiModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    TokenStrategy,
    ValidationService,
    AuthService,
    JwtStrategy,
    AstraService,
  ],
  exports: [ValidationService],
  controllers: [AuthController],
})
export class AuthModule {}
