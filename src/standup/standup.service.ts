import {
  AstraService,
  deleteItem,
  documentId,
} from '@cahllagerfeld/nestjs-astra';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StandupDTO } from './dto/standup.dto';
import { Standup } from './interfaces/standup.interface';
import { catchError, concatMap, filter } from 'rxjs/operators';
import { Author } from '../auth/getAuthorFromHeaders.decorator';
import { ValidationService } from '../auth/header-validation.service';
import { from } from 'rxjs';

@Injectable()
export class StandupService {
  constructor(
    private readonly astraService: AstraService,
    private readonly validationService: ValidationService,
  ) {}

  create(body: StandupDTO) {
    const { author, todayMessage, yesterdayMessage } = body;

    const newStandup: Standup = {
      yesterdayMessage: yesterdayMessage,
      todayMessage: todayMessage,
      author: { ...author },
      createdOn: new Date(Date.now()),
    };

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
    return this.astraService.find<Standup>().pipe(catchError(() => from([{}])));
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

  deleteStandup(id: string, authorObject: Author) {
    return this.astraService.get<Standup>(id).pipe(
      filter((data: Standup) => {
        if (data === null) {
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
          .delete(id)
          .pipe(filter((data: deleteItem) => data.deleted === true)),
      ),
    );
  }

  search(uid: string) {
    if (!uid) {
      throw new HttpException(
        'Please provide search context',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.astraService
      .find<Standup>({ 'author.uid': { $eq: uid } })
      .pipe(
        filter((data) => {
          if (data === null) {
            throw new HttpException(
              `no data found for ${uid}`,
              HttpStatus.NOT_FOUND,
            );
          }
          return true;
        }),
      );
  }
}
