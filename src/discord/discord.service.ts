import { deleteItem, documentId } from '@cahllagerfeld/nestjs-astra';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { catchError, concatMap, filter } from 'rxjs/operators';
import { ValidationService } from '../auth/header-validation.service';
import { Author } from '../auth/author-headers';
import { DiscordDTO } from './dto/discord.dto';
import { DiscordProfile } from './interfaces/discord.interface';
import { AstraService as AstraApiService } from '../astra/astra.service';
@Injectable()
export class DiscordService {
  constructor(
    private readonly astraService: AstraApiService,
    private readonly validationService: ValidationService,
  ) {}

  create(
    createDiscordDto: DiscordDTO,
    keyspaceName: string,
  ): Observable<documentId> {
    const discordUser: DiscordProfile = {
      author: { ...createDiscordDto.author },
      bio: createDiscordDto.bio,
      socials: { ...createDiscordDto.socials },
      createdOn: new Date(),
      updatedOn: new Date(),
    };

    return this.astraService
      .create<DiscordProfile>(discordUser, keyspaceName, 'discord', discordUser.author.uid)
      .pipe(
        catchError(() => {
          throw new HttpException(
            'Creation didnt pass as expected',
            HttpStatus.BAD_REQUEST,
          );
        }),
      );
  }

  findAll(keyspaceName: string) {
    return this.astraService
      .find<DiscordProfile>(keyspaceName, 'discord')
      .pipe(catchError(() => from([{}])));
  }

  findOne(id: string, keyspaceName: string) {
    return this.astraService
      .get<DiscordProfile>(id, keyspaceName, 'discord')
      .pipe(
        catchError(() => {
          throw new HttpException(
            'Creation didnt pass as expected',
            HttpStatus.BAD_REQUEST,
          );
        }),
      );
  }

  async update(
    id: string,
    updateDiscordDto: DiscordDTO,
    authorObject: Author,
    keyspaceName: string,
  ) {
    const { author, bio, socials } = updateDiscordDto;

    let discordUser;

    try {
      discordUser = await this.astraService
        .get<DiscordProfile>(id, keyspaceName, 'discord')
        .toPromise();
    } catch (e) {
      throw new HttpException(
        `no discord-profile for ${id} found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (
      !this.validationService.validateAuthor(
        discordUser.author,
        authorObject.uid,
        'discord',
      )
    ) {
      throw new HttpException(
        "update failed: author doesn't match",
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedDiscord = { ...discordUser };
    if (author && author.platform) {
      updatedDiscord.author.platform = author.platform;
    }
    if (author && author.uid) {
      updatedDiscord.author.uid = author.uid;
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

    let updateResponse;

    try {
      updateResponse = await this.astraService
        .replace<DiscordProfile>(id, updatedDiscord, keyspaceName, 'discord')
        .toPromise();
    } catch (e) {
      throw new HttpException(
        `no discord-profile for ${id} found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return updateResponse;
  }

  remove(id: string, authorObject: Author, keyspaceName: string) {
    return this.astraService
      .get<DiscordProfile>(id, keyspaceName, 'discord')
      .pipe(
        catchError(() => {
          throw new HttpException(
            `no discord-profile for ${id} found`,
            HttpStatus.NOT_FOUND,
          );
        }),
        filter((data: DiscordProfile) => {
          if (!data) {
            throw new HttpException(
              `no discord-profile for ${id} found`,
              HttpStatus.NOT_FOUND,
            );
          }

          if (
            !this.validationService.validateAuthor(
              data.author,
              authorObject.uid,
              'discord',
            )
          ) {
            throw new HttpException(
              "deletion failed: author doesn't match",
              HttpStatus.BAD_REQUEST,
            );
          }
          return true;
        }),
        concatMap(() =>
          this.astraService
            .delete(id, keyspaceName, 'discord')
            .pipe(filter((data: deleteItem) => data.deleted === true)),
        ),
      );
  }
}
