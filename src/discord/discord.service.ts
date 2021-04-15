import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ReadDiscordDto } from './dto/read-discord.dto';
import { UpdateDiscordDto } from './dto/update-discord.dto';
import { CreateDiscordDto } from './dto/create-discord.dto';

@Injectable()
export class DiscordService {
  private discords: ReadDiscordDto[] = [];

  create(createDiscordDto: CreateDiscordDto): ReadDiscordDto {
    const discordUser = {
      id: 123,
      username: createDiscordDto.username,
      bio: createDiscordDto.bio,
      socials: { ...createDiscordDto.socials },
      createdOn: new Date('2021-01-01T00:00:00.000Z'),
      updatedOn: new Date('2021-01-01T00:00:00.000Z'),
    };
    if (!discordUser.username) {
      throw new HttpException('Incomplete Data', HttpStatus.BAD_REQUEST);
    }
    this.discords.push(discordUser);

    return discordUser;
  }

  findAll(): ReadDiscordDto[] {
    return [...this.discords];
  }

  findOne(id: number): ReadDiscordDto {
    const discordUser = this.discords.find((user) => user.id === id);
    if (!discordUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return { ...discordUser };
  }

  update(id: number, updateDiscordDto: UpdateDiscordDto): ReadDiscordDto {
    const { username, bio, socials } = updateDiscordDto;
    const discordUser = this.discords.find((user) => user.id === id);
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

    const index = this.discords.findIndex(
      (discordUser) => discordUser.id === id,
    );
    this.discords[index] = updatedDiscord;

    return updatedDiscord;
  }

  remove(id: number) {
    const deleteElement = this.discords.find((user) => user.id == id);
    if (!deleteElement) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedDiscord = this.discords.filter((user) => user.id !== id);
    this.discords = [...updatedDiscord];
    return 'User deleted successfully!';
  }
}
