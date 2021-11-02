import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';

@Module({
  imports: [AuthModule],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
