import { Author } from '../../util/getAuthorFromHeaders.decorator';

export interface CalendarEvent {
  name: string;
  description?: string;
  url?: string;
  platform: string;
  author: CalendarEventAuthor;
  startDate: Date;
  endDate: Date;
  createdOn: Date;
  updatedOn: Date;
}

export interface CalendarEventAuthor extends Author {
  platform: string;
  uid: string;
}

export interface SortedEventResponse {
  ongoing: CalendarEvent[];
  future: CalendarEvent[];
}
