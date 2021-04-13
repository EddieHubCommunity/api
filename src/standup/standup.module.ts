import { Module } from '@nestjs/common';
import { StandupController } from './standup.controller';
import { StandupService } from './standup.service';

@Module({
  controllers: [StandupController],
  providers: [StandupService]
})
export class StandupModule {}
