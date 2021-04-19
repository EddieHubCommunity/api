import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { StandupController } from './standup.controller';
import { StandupService } from './standup.service';

@Module({
  imports: [AuthModule],
  controllers: [StandupController],
  providers: [StandupService],
})
export class StandupModule {}
