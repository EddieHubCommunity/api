import { Module } from '@nestjs/common';
import { TokenStrategy } from '../auth/token.strategy';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';

@Module({
  controllers: [CalendarController],
  providers: [CalendarService, TokenStrategy],
})
export class CalendarModule { }
