import {
  AstraService,
  deleteItem,
  documentId,
} from '@cahllagerfeld/nestjs-astra';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StandupDTO } from './dto/standup.dto';
import { Standup } from './interfaces/standup.interface';
import { concatMap, filter } from 'rxjs/operators';

@Injectable()
export class StandupService {
  constructor(private readonly astraService: AstraService) {}

  create(body: StandupDTO) {
    const { discordUser, todayMessage, yesterdayMessage } = body;

    const newStandup: Standup = {
      yesterdayMessage: yesterdayMessage,
      todayMessage: todayMessage,
      discordUser: discordUser,
      createdOn: new Date(Date.now()),
    };

    // this.standups.push(newStandup);
    return this.astraService.create<Standup>(newStandup).pipe(
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
    return this.astraService.find<Standup>();
  }

  findById(id: string) {
    return this.astraService.get<Standup>(id).pipe(
      filter((data: Standup) => {
        if (data === null) {
          throw new HttpException(
            `no standup for ${id} found`,
            HttpStatus.NOT_FOUND,
          );
        }
        return true;
      }),
    );
  }

  deleteStandup(id: string) {
    return this.astraService.get<Standup>(id).pipe(
      filter((data: Standup) => {
        if (data === null) {
          throw new HttpException(
            `no standup for ${id} found`,
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

  search(query) {
    if (!query.discordUser) {
      throw new HttpException(
        'Please provide search context',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.astraService
      .find<Standup>({ discordUser: { $eq: query.discordUser } })
      .pipe(
        filter((data) => {
          if (data === null) {
            throw new HttpException(
              `no data found for ${query}`,
              HttpStatus.NOT_FOUND,
            );
          }
          return true;
        }),
      );
  }
}
