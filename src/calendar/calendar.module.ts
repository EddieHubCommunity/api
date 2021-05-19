import { AstraModule } from '@cahllagerfeld/nestjs-astra';
import { Module } from '@nestjs/common';
import { CommonsModule } from '../commons/commons.module';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';

@Module({
  imports: [
    CommonsModule,
    AstraModule.forFeature({ namespace: 'eddiehub', collection: 'calendar' }),
  ],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
