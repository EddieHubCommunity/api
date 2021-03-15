import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadDiscordDto } from './dto/read-discord.dto';
import { UpdateDiscordDto } from './dto/update-discord.dto';
import { Discord } from './discord.entity';
@Injectable()
export class DiscordService {
  constructor(
    @InjectRepository(Discord)
    private readonly discordRepository: Repository<Discord>,
  ) {}
  private discord: ReadDiscordDto[] = [];
  async create(createDiscordDto: ReadDiscordDto) {
    const discordUser = {
      username: createDiscordDto.username,
      bio: createDiscordDto.bio,
      socials: { ...createDiscordDto.socials },
      createdOn: new Date(Date.now()),
      updatedOn: new Date(Date.now()),
    };
    if (!discordUser.username) {
      throw new HttpException('Incomplete Data', HttpStatus.BAD_REQUEST);
    }
    await this.discordRepository.save(discordUser);
    return 'User added successfully!';
  }

  async findAll() {
    return await this.discordRepository.find();
  }

  findOne(id: number) {
    const discordUser = this.discord.find((user) => user.id === id);
    if (!discordUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return { ...discordUser };
  }

  async update(id: string, updateDiscordDto: UpdateDiscordDto) {
    const { username, bio, socials } = updateDiscordDto;

    try {
      // Valid the ObjectID
      ObjectID(id);
    } catch (error) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    const discordUser = await this.discordRepository.findOne(id);

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

    await this.discordRepository.update(id, updatedDiscord);
    return 'User updated successfully!';
  }

  async remove(id: string) {
    try {
      // Valid the ObjectID
      ObjectID(id);
    } catch (error) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    const discordUser = await this.discordRepository.findOne(id);
    if (!discordUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    await this.discordRepository.delete(id);
    return 'User deleted successfully!!!!';
  }
}
