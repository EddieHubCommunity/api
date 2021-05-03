import { AstraService, documentId } from '@cahllagerfeld/nestjs-astra';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StandupDTO } from './dto/standup.dto';
import { Standup } from './interfaces/standup.interface';
import { tap } from 'rxjs/operators';

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
      tap((data: documentId) => {
        if (data === null) {
          throw new HttpException(
            'Creation didnt pass as expected',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
    );
  }

  findAll() {
    return this.astraService.find<Standup>();
  }

  findById(id: string) {
    return this.astraService.get<Standup>(id).pipe(
      tap((data: Standup) => {
        if (data === null) {
          throw new HttpException(
            `no standup for ${id} found`,
            HttpStatus.NOT_FOUND,
          );
        }
      }),
    );
  }

  deleteStandup(id: string) {
    return this.astraService.delete(id);
  }

  search(query) {
    return this.astraService
      .find<Standup>({ discordUser: { $eq: query.discordUser } })
      .pipe(
        tap((data) => {
          if (data === null) {
            throw new HttpException(
              `no data found for ${query}`,
              HttpStatus.NOT_FOUND,
            );
          }
        }),
      );
  }
}
