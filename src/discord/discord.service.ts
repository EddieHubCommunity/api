import { HttpException, HttpStatus } from '@nestjs/common';
import { ReadDiscordDto } from './dto/read-discord.dto';
import { UpdateDiscordDto } from './dto/update-discord.dto';
import { createClient } from '@astrajs/collections';

export class DiscordService {
  astraClient;
  usersCollection;
  basePath = '/api/rest/v2/KEYSPACES/<namespace>/collections/<collectionName>';
  constructor() {
    (async () => {
      try {
        this.astraClient = await createClient({
          astraDatabaseId: process.env.ASTRA_DB_ID,
          astraDatabaseRegion: process.env.ASTRA_DB_REGION,
          applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
        });

        this.usersCollection = this.astraClient
          .namespace('crud')
          .collection('users');
      } catch (ex) {
        console.log(ex.message);
      }
    })();
  }
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
    await this.usersCollection.create({
      ...discordUser,
    });
    return 'User added successfully! ';
  }

  async findAll() {
    return await this.usersCollection.find();
  }

  async findOne(id: string) {
    const discordUser = await this.usersCollection.get(id);
    if (!discordUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return { ...discordUser };
  }

  async update(id: string, updateDiscordDto: UpdateDiscordDto) {
    const { username, bio, socials } = updateDiscordDto;

    const discordUser = await this.findOne(id);

    if (username) {
      discordUser.username = username;
    }
    if (bio) {
      discordUser.bio = bio;
    }

    if (socials && socials.discord) {
      discordUser.socials.discord = socials.discord;
    }
    if (socials && socials.twitter) {
      discordUser.socials.twitter = socials.twitter;
    }
    if (socials && socials.linkedin) {
      discordUser.socials.linkedin = socials.linkedin;
    }
    if (socials && socials.github) {
      discordUser.socials.github = socials.github;
    }

    await this.usersCollection.update(id, discordUser);
    return 'User updated successfully!';
  }

  async remove(id: string) {
    await this.usersCollection.delete(id);
    return 'User deleted successfully!';
  }
}
