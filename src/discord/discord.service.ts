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
    const discordUser = this.discord.find((user) => user.id === id);
    this.DiscordNotFound(discordUser);
    return { ...discordUser };
  }

  update(id: number, updateDiscordDto: UpdateDiscordDto) {
    const {
      username,
      bio: { description, twitter, linkedin, github },
    } = updateDiscordDto;

    const discordUser = this.discord.find((user) => user.id === id);
    this.DiscordNotFound(discordUser);
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

    return 'User updated successfully!';
  }

  remove(id: number) {
    const userIndex = this.discord.findIndex((user) => user.id === id);
    this.DiscordNotFound(userIndex);
    this.discord.splice(userIndex);
    return 'User deleted successfully!';
  }

  private DiscordNotFound(discord: ReadDiscordDto | number) {
    if (!discord || discord < 0) {
      throw new NotFoundException('User Not Found');
    }
  }
}
