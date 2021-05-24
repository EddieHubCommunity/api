import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from '../auth/token.strategy';
import { Author, AuthorObject } from '../auth/getAuthorFromHeaders.decorator';
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
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  @ApiHeader({ name: 'User-Uid', required: true })
  @ApiHeader({ name: 'Platform', required: true })
  updateOne(
    @Param('id') id: string,
    @Body() calendarEvent: CalendarEventDTO,
    @AuthorObject() author: Author,
  ) {
    return this.service.updateOne(id, calendarEvent, author);
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  @HttpCode(204)
  @ApiSecurity('token')
  @ApiHeader({ name: 'User-Uid', required: true })
  @ApiHeader({ name: 'Platform', required: true })
  remove(@Param('id') id: string, @AuthorObject() author: Author) {
    return this.service.remove(id, author);
  }
}
