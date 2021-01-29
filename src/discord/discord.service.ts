import { Injectable, NotFoundException } from '@nestjs/common';
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
    const discordUser = this.findDiscord(id);

    return { ...discordUser };
  }

  update(id: number, updateDiscordDto: UpdateDiscordDto) {
    const {
      username,
      bio: { description, twitter, linkedin, github },
    } = updateDiscordDto;

    const discordUser = this.findDiscord(id);
    const updatedDiscord = { ...discordUser };
    if (username) {
      updatedDiscord.username = username;
    }
    if (description) {
      updatedDiscord.bio.description = description;
    }
    if (twitter) {
      updatedDiscord.bio.twitter = twitter;
    }
    if (linkedin) {
      updatedDiscord.bio.linkedin = linkedin;
    }
    if (github) {
      updatedDiscord.bio.github = github;
    }

    return `This action updates a #${id} discord`;
  }

  remove(id: number) {
    return `This action removes a #${id} discord`;
  }

  private findDiscord(id: number): ReadDiscordDto {
    const userIndex = this.discord.findIndex((user) => user.id === id);
    const discordUser = this.discord[userIndex];
    if (!discordUser) {
      throw new NotFoundException('User Not Found');
    }

    return discordUser;
  }
}
