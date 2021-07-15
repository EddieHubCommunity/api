import { Module } from '@nestjs/common';
import { TokenStrategy } from './token.strategy';
import { ValidationService } from './header-validation.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  //TODO: hardcoded secret
  imports: [JwtModule.register({ secret: 'test' })],
  providers: [TokenStrategy, ValidationService, AuthService, JwtStrategy],
  exports: [ValidationService],
  controllers: [AuthController],
})
export class AuthModule {}
