import { Injectable } from '@nestjs/common';
import { CreateDiscordDto } from './dto/create-discord.dto';
import { UpdateDiscordDto } from './dto/update-discord.dto';

@Injectable()
export class DiscordService {
  create(createDiscordDto: CreateDiscordDto) {
    return 'This action adds a new discord';
  }

  findAll() {
    return `This action returns all discord`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discord`;
  }

  update(id: number, updateDiscordDto: UpdateDiscordDto) {
    return `This action updates a #${id} discord`;
  }

  remove(id: number) {
    return `This action removes a #${id} discord`;
  }
}
