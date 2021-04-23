import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CalendarEventDTO } from './dto/calendar.dto';
import {
  CalendarEvent,
  SortedEventResponse,
} from './interfaces/calendar.interface';
import { isFuture } from 'date-fns';

@Injectable()
export class CalendarService {
  constructor() {}
  private calendarEvents: CalendarEvent[] = [];

  createCalendarEvent(calendarEventBody: CalendarEventDTO): CalendarEvent {
    const newEvent: CalendarEvent = {
      id: 123,
      name: calendarEventBody.name,
      description: calendarEventBody.description,
      url: calendarEventBody.url,
      platform: calendarEventBody.platform,
      author: { ...calendarEventBody.author },
      startDate: calendarEventBody.startDate,
      endDate: calendarEventBody.endDate,
      createdOn: new Date('2021-01-01T00:00:00.000Z'),
      updatedOn: new Date('2021-01-01T00:00:00.000Z'),
    };

    this.calendarEvents.push(newEvent);

    return newEvent;
  }

  findAllEvents(): SortedEventResponse {
    const future = this.calendarEvents.filter((event: CalendarEvent) => {
      if (isFuture(event.startDate) && isFuture(event.endDate)) {
        return event;
      }
      return;
    });

    let ongoing = this.calendarEvents.filter((event) => {
      if (isFuture(event.endDate) && !isFuture(event.startDate)) {
        return event;
      }
      return;
    });

    return { future: [...future], ongoing: [...ongoing] };
  }

  findOne(id: number): CalendarEvent {
    const event = this.calendarEvents.find((event) => event.id === id);
    if (!event) {
      throw new HttpException('Event Not Found', HttpStatus.NOT_FOUND);
    }
    return { ...event };
  }

  updateOne(id: number, calendarDTO: CalendarEventDTO): CalendarEvent {
    const existingEvent = this.calendarEvents.find((event) => event.id === id);
    if (!existingEvent) {
      throw new HttpException('Event Not Found', HttpStatus.NOT_FOUND);
    }

    const updateEvent = { ...existingEvent };

    const {
      description,
      endDate,
      startDate,
      name,
      platform,
      url,
      author,
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

    const index = this.calendarEvents.findIndex((event) => event.id === id);
    this.calendarEvents[index] = updateEvent;

    return updateEvent;
  }

  remove(id: number) {
    const deleteElement = this.calendarEvents.find((event) => event.id == id);
    if (!deleteElement) {
      throw new HttpException('Event Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedDiscord = this.calendarEvents.filter(
      (event) => event.id !== id,
    );
    this.calendarEvents = [...updatedDiscord];

    return {};
  }
}
