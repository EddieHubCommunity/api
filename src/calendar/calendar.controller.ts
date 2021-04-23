import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from '../auth/token.strategy';
import { CalendarService } from './calendar.service';
import { CalendarEventDTO } from './dto/calendar.dto';

@Controller('calendar')
@ApiTags('Calendar')
export class CalendarController {
  constructor(private readonly service: CalendarService) {}

  @Post()
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  create(@Body() calendarEvent: CalendarEventDTO) {
    return this.service.createCalendarEvent(calendarEvent);
  }

  @Get()
  findAll() {
    return this.service.findAllEvents();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  updateOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() calendarEvent: CalendarEventDTO,
  ) {
    return this.service.updateOne(id, calendarEvent);
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.service.remove(id);
  }
}
