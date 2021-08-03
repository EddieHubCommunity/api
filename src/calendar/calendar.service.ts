import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CalendarEventDTO } from './dto/calendar.dto';
import { CalendarEvent } from './interfaces/calendar.interface';
import { catchError, concatMap, filter } from 'rxjs/operators';
import { deleteItem, documentId } from '@cahllagerfeld/nestjs-astra';
import { forkJoin, from, Observable } from 'rxjs';
import { Author } from '../auth/author-headers';
import { ValidationService } from '../auth/header-validation.service';
import { AstraService as AstraApiService } from '../astra/astra.service';

@Injectable()
export class CalendarService {
  constructor(
    private readonly astraService: AstraApiService,
    private readonly validationService: ValidationService,
  ) {}

  createCalendarEvent(
    calendarEventBody: CalendarEventDTO,
    keyspaceName: string,
  ): Observable<documentId> {
    const newEvent: CalendarEvent = {
      name: calendarEventBody.name,
      description: calendarEventBody.description,
      url: calendarEventBody.url,
      platform: calendarEventBody.platform,
      author: { ...calendarEventBody.author },
      startDate: calendarEventBody.startDate,
      endDate: calendarEventBody.endDate,
      createdOn: new Date(),
      updatedOn: new Date(),
    };

    return this.astraService
      .create<CalendarEvent>(newEvent, keyspaceName, 'calendar')
      .pipe(
        catchError(() => {
          throw new HttpException(
            'Creation didnt pass as expected',
            HttpStatus.BAD_REQUEST,
          );
        }),
      );
  }

  findAllEvents(keyspaceName: string) {
    const future = this.astraService.find<CalendarEvent>(
      keyspaceName,
      'calendar',
      {
        startDate: { $gt: new Date() },
        endDate: { $gt: new Date() },
      },
    );

    const ongoing = this.astraService.find<CalendarEvent>(
      keyspaceName,
      'calendar',
      {
        startDate: { $lt: new Date() },
        endDate: { $gt: new Date() },
      },
    );

    return forkJoin({ future, ongoing }).pipe(catchError(() => from([{}])));
  }

  findOne(id: string, keyspaceName: string) {
    return this.astraService
      .get<CalendarEvent>(id, keyspaceName, 'calendar')
      .pipe(
        catchError(() => {
          throw new HttpException(
            'Creation didnt pass as expected',
            HttpStatus.BAD_REQUEST,
          );
        }),
      );
  }

  async updateOne(
    id: string,
    calendarDTO: CalendarEventDTO,
    authorObject: Author,
    keyspaceName: string,
  ) {
    const oldDocument = await this.astraService
      .get<CalendarEvent>(id, keyspaceName, 'calendar')
      .pipe(
        catchError(() => {
          throw new HttpException(
            `no event for ${id} found`,
            HttpStatus.NOT_FOUND,
          );
        }),
      )
      .toPromise();

    if (!oldDocument) {
      throw new HttpException(`no event for ${id} found`, HttpStatus.NOT_FOUND);
    }

    if (
      !this.validationService.validateAuthor(
        oldDocument.author,
        authorObject.uid,
        authorObject.platform,
      )
    ) {
      throw new HttpException(
        "update failed: author doesn't match",
        HttpStatus.BAD_REQUEST,
      );
    }

    const updateEvent = { ...oldDocument };

    const { description, name, platform, url, author, startDate, endDate } =
      calendarDTO;

    if (name) {
      updateEvent.name = name;
    }
    if (description) {
      updateEvent.description = description;
    }
    if (url) {
      updateEvent.url = url;
    }
    if (platform) {
      updateEvent.platform = platform;
    }
    if (author && author.platform) {
      updateEvent.author.platform = author.platform;
    }
    if (author && author.uid) {
      updateEvent.author.uid = author.uid;
    }
    if (startDate) {
      updateEvent.startDate = startDate;
    }
    if (endDate) {
      updateEvent.endDate = endDate;
    }

    updateEvent.updatedOn = new Date();

    const updateResponse = await this.astraService
      .replace<CalendarEvent>(id, updateEvent, keyspaceName, 'calendar')
      .pipe(
        catchError(() => {
          throw new HttpException(
            `no event for ${id} found`,
            HttpStatus.NOT_FOUND,
          );
        }),
      )
      .toPromise();

    return updateResponse;
  }

  remove(id: string, authorObject: Author, keyspaceName: string) {
    return this.astraService
      .get<CalendarEvent>(id, keyspaceName, 'calendar')
      .pipe(
        catchError(() => {
          throw new HttpException(
            `no event for ${id} found`,
            HttpStatus.NOT_FOUND,
          );
        }),
        filter((data: CalendarEvent) => {
          if (!data) {
            throw new HttpException(
              `no event for ${id} found`,
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
        concatMap(() => this.astraService.delete(id, keyspaceName, 'calendar')),
        filter((data: deleteItem) => data.deleted === true),
      );
  }
}
