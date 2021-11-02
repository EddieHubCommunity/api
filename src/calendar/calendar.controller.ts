import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Author, AuthorObject } from '../auth/author-headers';
import { Scopes } from '../auth/decorators/scopes.decorator';
import { User } from '../auth/decorators/user.decorator';
import { ScopesGuard } from '../auth/guards/scopes.guard';
import {
  ScopesDictionary,
  TokenPayload,
} from '../auth/interfaces/token-payload.interface';
import { JWTGuard } from '../auth/jwt.strategy';
import { CalendarService } from './calendar.service';
import { CalendarEventDTO } from './dto/calendar.dto';

@Controller('calendar')
@ApiTags('Calendar')
export class CalendarController {
  constructor(private readonly service: CalendarService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JWTGuard, ScopesGuard)
  @Scopes(ScopesDictionary.WRITE)
  create(@Body() calendarEvent: CalendarEventDTO, @User() user: TokenPayload) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JWTGuard, ScopesGuard)
  @Scopes(ScopesDictionary.READ)
  findAll(@User() user: TokenPayload) {}

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JWTGuard, ScopesGuard)
  @Scopes(ScopesDictionary.READ)
  findOne(@Param('id') id: string, @User() user: TokenPayload) {}

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JWTGuard, ScopesGuard)
  @Scopes(ScopesDictionary.WRITE)
  @ApiHeader({ name: 'User-Uid', required: true })
  @ApiHeader({ name: 'Platform', required: true })
  updateOne(
    @Param('id') id: string,
    @Body() calendarEvent: CalendarEventDTO,
    @AuthorObject() author: Author,
    @User() user: TokenPayload,
  ) {}

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JWTGuard, ScopesGuard)
  @Scopes(ScopesDictionary.WRITE)
  @HttpCode(204)
  @ApiHeader({ name: 'User-Uid', required: true })
  @ApiHeader({ name: 'Platform', required: true })
  remove(
    @Param('id') id: string,
    @AuthorObject() author: Author,
    @User() user: TokenPayload,
  ) {}
}
