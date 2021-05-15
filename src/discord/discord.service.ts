import {
  AstraService,
  deleteItem,
  documentId,
  findResult,
} from '@cahllagerfeld/nestjs-astra';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { concatMap, filter } from 'rxjs/operators';
import { DiscordDTO } from './dto/discord.dto';
import { DiscordProfile } from './interfaces/discord.interface';

@Injectable()
export class DiscordService {
  constructor(private readonly astraService: AstraService) {}

  create(createDiscordDto: DiscordDTO): Observable<documentId> {
    const discordUser = {
      id: 123,
      username: createDiscordDto.username,
      bio: createDiscordDto.bio,
      socials: { ...createDiscordDto.socials },
      createdOn: new Date(),
      updatedOn: new Date(),
    };

    return this.astraService.create<DiscordProfile>(discordUser).pipe(
      filter((data: documentId) => {
        if (data === null) {
          throw new HttpException(
            'Creation didnt pass as expected',
            HttpStatus.BAD_REQUEST,
          );
        }
        return true;
      }),
    );
  }

  findAll(): Observable<findResult<DiscordProfile>> {
    return this.astraService.find<DiscordProfile>();
  }

  findOne(id: string) {
    return this.astraService.get<DiscordProfile>(id).pipe(
      filter((data: DiscordProfile) => {
        if (data === null) {
          throw new HttpException(
            `no discord-profile for ${id} found`,
            HttpStatus.NOT_FOUND,
          );
        }
        return true;
      }),
    );
  }

  async update(id: string, updateDiscordDto: DiscordDTO) {
    const { username, bio, socials } = updateDiscordDto;

    const discordUser = await this.astraService
      .get<DiscordProfile>(id)
      .toPromise();

    if (discordUser === null) {
      throw new HttpException(
        `no discord-profile for ${id} found`,
        HttpStatus.NOT_FOUND,
      );
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

    updatedDiscord.updatedOn = new Date();

    const updateResponse = await this.astraService
      .replace<DiscordProfile>(id, updatedDiscord)
      .toPromise();

    if (updateResponse === null) {
      throw new HttpException(
        `no discord-profile for ${id} found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return updateResponse;
  }

  remove(id: string) {
    return this.astraService.get<DiscordProfile>(id).pipe(
      filter((data: DiscordProfile) => {
        if (data === null) {
          throw new HttpException(
            `no discord-profile for ${id} found`,
            HttpStatus.NOT_FOUND,
          );
        }
        return true;
      }),
      concatMap(() =>
        this.astraService
          .delete(id)
          .pipe(filter((data: deleteItem) => data.deleted === true)),
      ),
    );
  }
}
