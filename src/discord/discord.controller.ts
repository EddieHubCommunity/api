import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getMongoManager, Repository } from 'typeorm';
import { DiscordService } from './discord.service';
import { CreateDiscordDto } from './dto/create-discord.dto';
import { UpdateDiscordDto } from './dto/update-discord.dto';
import { Discord } from './discord.entity';
@Controller('discord')
export class DiscordController {
  constructor(
    @InjectRepository(Discord)
    private readonly discordRepository: Repository<Discord>,
  ) {}

  @Post()
  async create(@Body() createDiscordDto: CreateDiscordDto) {
    // const manager = getMongoManager();
    // await manager.save(createDiscordDto);
    await this.discordRepository.save(createDiscordDto);
    // return this.discordService.create(createDiscordDto);
  }

  @Get()
  findAll() {
    return 'Find All';
    // return this.discordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'Find One';
    // return this.discordService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDiscordDto: UpdateDiscordDto) {
    return 'Update';
    // return this.discordService.update(+id, updateDiscordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'Delete';
    // return this.discordService.remove(+id);
  }
}
