import {
  AstraService,
  deleteItem,
  documentId,
} from '@cahllagerfeld/nestjs-astra';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { catchError, concatMap, filter } from 'rxjs/operators';
import { ValidationService } from '../auth/header-validation.service';
import { Author } from '../auth/getAuthorFromHeaders.decorator';
import { DiscordDTO } from './dto/discord.dto';
import { DiscordProfile } from './interfaces/discord.interface';

@Injectable()
export class DiscordService {
  constructor(
    private readonly astraService: AstraService,
    private readonly validationService: ValidationService,
  ) {}

  create(createDiscordDto: DiscordDTO): Observable<documentId> {
    const discordUser: DiscordProfile = {
      author: { ...createDiscordDto.author },
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

  findAll() {
    return this.astraService
      .find<DiscordProfile>()
      .pipe(catchError(() => from([{}])));
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

  async update(id: string, updateDiscordDto: DiscordDTO, authorObject: Author) {
    const { author, bio, socials } = updateDiscordDto;

    const discordUser = await this.astraService
      .get<DiscordProfile>(id)
      .toPromise();

    if (discordUser === null) {
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

  remove(id: string, authorObject: Author) {
    return this.astraService.get<DiscordProfile>(id).pipe(
      filter((data: DiscordProfile) => {
        if (data === null) {
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
          .delete(id)
          .pipe(filter((data: deleteItem) => data.deleted === true)),
      ),
    );
  }
}
