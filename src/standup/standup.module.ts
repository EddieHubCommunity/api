import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { StandupController } from './standup.controller';
import { StandupService } from './standup.service';
import { AstraService as AstraApiService } from '../astra/astra.service';
import { AstraApiModule } from '../astra/astra-api.module';

@Module({
  imports: [AuthModule, AstraApiModule],
  controllers: [StandupController],
  providers: [StandupService, AstraApiService],
})
export class StandupModule {}
