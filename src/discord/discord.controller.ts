import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { ApiHeader, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from '../auth/token.strategy';
import { Author, AuthorObject } from '../auth/getAuthorFromHeaders.decorator';
import { DiscordService } from './discord.service';
import { DiscordDTO } from './dto/discord.dto';
@ApiTags('Discord')
@Controller('discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Post()
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  create(@Body() createDiscordDto: DiscordDTO) {
    return this.discordService.create(createDiscordDto);
  }

  @Get()
  findAll() {
    return this.discordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discordService.findOne(id);
  }

  @Put(':id')
  @ApiSecurity('token')
  @UseGuards(TokenGuard)
  @ApiHeader({ name: 'User-Uid', required: true })
  update(
    @Param('id') id: string,
    @Body() updateDiscordDto: DiscordDTO,
    @AuthorObject() author: Author,
  ) {
    return this.discordService.update(id, updateDiscordDto, author);
  }

  @Delete(':id')
  @ApiSecurity('token')
  @HttpCode(204)
  @ApiHeader({ name: 'User-Uid', required: true })
  @UseGuards(TokenGuard)
  remove(@Param('id') id: string, @AuthorObject() author: Author) {
    return this.discordService.remove(id, author);
  }

  @Get(':id/github')
  @ApiSecurity('token')
  @ApiHeader({ name: 'User-Uid', required: true })
  @UseGuards(TokenGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  github(@Param('uid') uid: string) {
    return this.discordService.github(uid);
  }
}
