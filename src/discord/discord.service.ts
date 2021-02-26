import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateDiscordDto } from './dto/create-discord.dto';
import { ReadDiscordDto } from './dto/read-discord.dto';
import { UpdateDiscordDto } from './dto/update-discord.dto';

@Injectable()
export class DiscordService {
  private discord: ReadDiscordDto[] = [];
  create(createDiscordDto: CreateDiscordDto) {
    const discordUser = {
      id: Date.now(),
      username: createDiscordDto.username,
      bio: { ...createDiscordDto.bio },
      createdOn: new Date(Date.now()),
      updatedOn: new Date(Date.now()),
    };
    if (!discordUser.username) {
      throw new HttpException('Incomplete Data', HttpStatus.BAD_REQUEST);
    }
    this.discord.push(discordUser);
    return 'User added successfully!';
  }

  findAll() {
    return [...this.discord];
  }

  findOne(id: number) {
    const discordUser = this.discord.find((user) => user.id === id);
    if (!discordUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return { ...discordUser };
  }

  update(id: number, updateDiscordDto: UpdateDiscordDto) {
    const {
      username,
      bio: { description, twitter, linkedin, github },
    } = updateDiscordDto;

    const discordUser = this.discord.find((user) => user.id === id);
    if (!discordUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
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
    const updatedDiscord = this.discord.filter((user) => user.id !== id);
    if (!updatedDiscord) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    this.discord = [...updatedDiscord];
    return 'User deleted successfully!';
  }
}
