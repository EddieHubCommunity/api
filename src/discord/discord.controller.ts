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
import { ApiHeader, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Author, AuthorObject } from '../auth/author-headers';
import { TokenGuard } from '../auth/token.strategy';
import { DiscordService } from './discord.service';
import { DiscordDTO } from './dto/discord.dto';
@ApiTags('Discord')
@Controller('discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Post()
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  create(@Body() createDiscordDto: DiscordDTO) {}

  @Get()
  findAll() {}

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @Patch(':id')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  @ApiHeader({ name: 'User-Uid', required: true })
  update(
    @Param('id') id: string,
    @Body() updateDiscordDto: DiscordDTO,
    @AuthorObject() author: Author,
  ) {}

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  @ApiHeader({ name: 'User-Uid', required: true })
  remove(@Param('id') id: string, @AuthorObject() author: Author) {}
}
