import { Module } from '@nestjs/common';
import { TokenStrategy } from '../auth/token.strategy';
import { StandupController } from './standup.controller';
import { StandupService } from './standup.service';

@Module({
  controllers: [StandupController],
  providers: [StandupService, TokenStrategy],
})
export class StandupModule {}
