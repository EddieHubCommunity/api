import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { StandupController } from './standup.controller';
import { StandupService } from './standup.service';
import { AstraService } from '../astra/astra.service';
import { AstraApiModule } from '../astra/astra-api.module';

@Module({
  imports: [
    AuthModule,
    AstraApiModule,
    // AstraModule.forFeature({ namespace: 'eddiehub', collection: 'standup' }),
  ],
  controllers: [StandupController],
  providers: [StandupService, AstraService],
})
export class StandupModule {}
