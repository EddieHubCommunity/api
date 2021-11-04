import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiHeader, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Author, AuthorObject } from '../auth/author-headers';
import { TokenGuard } from '../auth/token.strategy';
import { CalendarService } from './calendar.service';
import { CalendarEventDTO } from './dto/calendar.dto';

@Controller('calendar')
@ApiTags('Calendar')
export class CalendarController {
  constructor(private readonly service: CalendarService) { }

  @Post()
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  create(@Body() calendarEvent: CalendarEventDTO) { }

  @Get()
  findAll() { }

  @Get(':id')
  findOne(@Param('id') id: string) { }

  @Patch(':id')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  @ApiHeader({ name: 'User-Uid', required: true })
  @ApiHeader({ name: 'Platform', required: true })
  updateOne(
    @Param('id') id: string,
    @Body() calendarEvent: CalendarEventDTO,
    @AuthorObject() author: Author,
  ) { }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  @ApiHeader({ name: 'User-Uid', required: true })
  @ApiHeader({ name: 'Platform', required: true })
  remove(
    @Param('id') id: string,
    @AuthorObject() author: Author,
  ) { }
}
