import { Module } from '@nestjs/common';
import { AstraService as AstraApiService } from '../astra/astra.service';
import { AuthModule } from '../auth/auth.module';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';

@Module({
  imports: [AuthModule],
  controllers: [CalendarController],
  providers: [CalendarService, AstraApiService],
})
export class CalendarModule {}
