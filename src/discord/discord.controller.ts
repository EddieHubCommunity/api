import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from '../auth/token.strategy';
import { DiscordService } from './discord.service';
import { CreateDiscordDto } from './dto/create-discord.dto';
import { UpdateDiscordDto } from './dto/update-discord.dto';

@ApiTags('Discord')
@Controller('discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Post()
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  create(@Body() createDiscordDto: CreateDiscordDto) {
    return this.discordService.create(createDiscordDto);
  }

  @Get()
  findAll() {
    return this.discordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discordService.findOne(+id);
  }

  @Put(':id')
  @ApiSecurity('token')
  @UseGuards(TokenGuard)
  update(@Param('id') id: string, @Body() updateDiscordDto: UpdateDiscordDto) {
    return this.discordService.update(+id, updateDiscordDto);
  }

  @Delete(':id')
  @ApiSecurity('token')
  @UseGuards(TokenGuard)
  remove(@Param('id') id: string) {
    return this.discordService.remove(+id);
  }
}
