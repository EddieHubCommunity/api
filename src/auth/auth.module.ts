import { Module } from '@nestjs/common';
import { TokenStrategy } from './token.strategy';
import { ValidationService } from './header-validation.service';
@Module({
  providers: [TokenStrategy, ValidationService],
  exports: [ValidationService],
})
export class AuthModule {}
