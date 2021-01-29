import { Injectable } from '@nestjs/common';
import { CreateDiscordDto } from './dto/create-discord.dto';
import { ReadDiscordDto } from './dto/read-discord.dto';
import { UpdateDiscordDto } from './dto/update-discord.dto';

@Injectable()
export class DiscordService {
  private readonly discord: ReadDiscordDto[] = [];
  create(createDiscordDto: CreateDiscordDto) {
    const discordUser = {
      id: Date.now(),
      username: createDiscordDto.username,
      bio: { ...createDiscordDto.bio },
      createdOn: new Date(Date.now()),
      updatedOn: new Date(Date.now()),
    };
    this.discord.push(discordUser);
    return 'User added successfully!';
  }

  findAll() {
    return [...this.discord];
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
