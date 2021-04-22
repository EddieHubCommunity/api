import { Module } from '@nestjs/common';
import { TokenStrategy } from './token.strategy';
@Module({ providers: [TokenStrategy] })
export class AuthModule {}
