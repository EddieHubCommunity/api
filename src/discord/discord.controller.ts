import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiscordService } from './discord.service';
import { CreateDiscordDto } from './dto/create-discord.dto';
import { UpdateDiscordDto } from './dto/update-discord.dto';

@ApiTags('Discord')
@Controller('discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Post()
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
  update(@Param('id') id: string, @Body() updateDiscordDto: UpdateDiscordDto) {
    return this.discordService.update(+id, updateDiscordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discordService.remove(+id);
  }
}
