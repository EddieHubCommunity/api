import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ReadDiscordDto } from './dto/read-discord.dto';
import { UpdateDiscordDto } from './dto/update-discord.dto';
import { CreateDiscordDto } from './dto/create-discord.dto';

@Injectable()
export class DiscordService {
  private discord: ReadDiscordDto[] = [];
  create(createDiscordDto: CreateDiscordDto) {
    const discordUser = {
      id: Date.now(),
      username: createDiscordDto.username,
      bio: createDiscordDto.bio,
      socials: { ...createDiscordDto.socials },
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
    const { username, bio, socials } = updateDiscordDto;

    const discordUser = this.discord.find((user) => user.id === id);
    if (!discordUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedDiscord = { ...discordUser };
    if (username) {
      updatedDiscord.username = username;
    }
    if (bio) {
      updatedDiscord.bio = bio;
    }

    if (socials && socials.discord) {
      updatedDiscord.socials.discord = socials.discord;
    }
    if (socials && socials.twitter) {
      updatedDiscord.socials.twitter = socials.twitter;
    }
    if (socials && socials.linkedin) {
      updatedDiscord.socials.linkedin = socials.linkedin;
    }
    if (socials && socials.github) {
      updatedDiscord.socials.github = socials.github;
    }

    const index = this.discord.findIndex(
      (discordUser) => discordUser.id === id,
    );
    this.discord[index] = updatedDiscord;

    return 'User updated successfully!';
  }

  remove(id: number) {
    const deleteElement = this.discord.find((standup) => standup.id == id);
    if (!deleteElement) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedDiscord = this.discord.filter((user) => user.id !== id);
    this.discord = [...updatedDiscord];
    return 'User deleted successfully!';
  }
}
