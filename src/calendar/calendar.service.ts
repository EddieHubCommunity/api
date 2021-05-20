import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CalendarEventDTO } from './dto/calendar.dto';
import { CalendarEvent } from './interfaces/calendar.interface';
import { concatMap, filter } from 'rxjs/operators';
import {
  AstraService,
  deleteItem,
  documentId,
} from '@cahllagerfeld/nestjs-astra';
import { forkJoin, Observable } from 'rxjs';
import { Author } from '../util/getAuthorFromHeaders.decorator';
import { ValidationService } from '../commons/validation.service';

@Injectable()
export class CalendarService {
  constructor(
    private readonly astraService: AstraService,
    private readonly validationService: ValidationService,
  ) {}

  createCalendarEvent(
    calendarEventBody: CalendarEventDTO,
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

    return this.astraService.create<CalendarEvent>(newEvent).pipe(
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

  findAllEvents() {
    const future = this.astraService.find<CalendarEvent>({
      startDate: { $gt: new Date() },
      endDate: { $gt: new Date() },
    });

    const ongoing = this.astraService.find<CalendarEvent>({
      startDate: { $lt: new Date() },
      endDate: { $gt: new Date() },
    });

    return forkJoin({ future, ongoing });
  }

  findOne(id: string) {
    return this.astraService.get<CalendarEvent>(id).pipe(
      filter((data: CalendarEvent) => {
        if (data === null) {
          throw new HttpException(
            `no event for ${id} found`,
            HttpStatus.NOT_FOUND,
          );
        }
        return true;
      }),
    );
  }

  async updateOne(
    id: string,
    calendarDTO: CalendarEventDTO,
    authorObject: Author,
  ) {
    const oldDocument = await this.astraService
      .get<CalendarEvent>(id)
      .toPromise();

    if (oldDocument === null) {
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
        `update failed: author doesn't match`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const updateEvent = { ...oldDocument };

    const {
      description,
      name,
      platform,
      url,
      author,
      startDate,
      endDate,
    } = calendarDTO;

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
      .replace<CalendarEvent>(id, updateEvent)
      .toPromise();

    if (updateResponse === null) {
      throw new HttpException(`no event for ${id} found`, HttpStatus.NOT_FOUND);
    }

    return updateResponse;
  }

  remove(id: string, authorObject: Author) {
    return this.astraService.get<CalendarEvent>(id).pipe(
      filter((data: CalendarEvent) => {
        if (data === null) {
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
            `deletion failed: author doesn't match`,
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
