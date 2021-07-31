import { deleteItem, documentId } from '@cahllagerfeld/nestjs-astra';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StandupDTO } from './dto/standup.dto';
import { Standup } from './interfaces/standup.interface';
import { catchError, concatMap, filter } from 'rxjs/operators';
import { Author } from '../auth/author-headers';
import { ValidationService } from '../auth/header-validation.service';
import { from } from 'rxjs';
import { AstraService as AstraApiService } from '../astra/astra.service';

@Injectable()
export class StandupService {
  constructor(
    private readonly astraService: AstraApiService,
    private readonly validationService: ValidationService,
  ) {}

  create(body: StandupDTO, keyspaceName: string) {
    const { author, todayMessage, yesterdayMessage } = body;

    const newStandup: Standup = {
      yesterdayMessage: yesterdayMessage,
      todayMessage: todayMessage,
      author: { ...author },
      createdOn: new Date(Date.now()),
    };

    return this.astraService
      .create<Standup>(newStandup, keyspaceName, 'standup')
      .pipe(
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

  findAll(keyspaceName: string) {
    return this.astraService
      .find<Standup>(keyspaceName, 'standup')
      .pipe(catchError(() => from([{}])));
  }

  findById(id: string, keyspaceName: string) {
    return this.astraService.get<Standup>(id, keyspaceName, 'standup').pipe(
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

  deleteStandup(id: string, authorObject: Author, keyspaceName: string) {
    return this.astraService.get<Standup>(id, keyspaceName, 'standup').pipe(
      catchError(() => {
        throw new HttpException(
          `no standup for ${id} found`,
          HttpStatus.NOT_FOUND,
        );
      }),
      filter((data: Standup) => {
        if (!data) {
          throw new HttpException(
            `no standup for ${id} found`,
            HttpStatus.NOT_FOUND,
          );
        }

        if (
          !this.validationService.validateAuthor(
            data.author,
            authorObject.uid,
            authorObject.platform,
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
          .delete(id, 'eddiehub', 'standup')
          .pipe(filter((data: deleteItem) => data.deleted === true)),
      ),
    );
  }

  search(uid: string, keyspaceName: string) {
    if (!uid) {
      throw new HttpException(
        'Please provide search context',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.astraService
      .find<Standup>(keyspaceName, 'standup', { 'author.uid': { $eq: uid } })
      .pipe(
        catchError(() => {
          throw new HttpException(
            `no standup for ${uid} found`,
            HttpStatus.NOT_FOUND,
          );
        }),
      );
  }
}
