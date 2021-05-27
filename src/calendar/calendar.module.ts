import { AstraModule } from '@cahllagerfeld/nestjs-astra';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';

@Module({
  imports: [
    AuthModule,
    AstraModule.forFeature({ namespace: 'eddiehub', collection: 'calendar' }),
  ],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
