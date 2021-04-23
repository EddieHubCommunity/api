export interface CalendarEvent {
  id: number;
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

export interface CalendarEventAuthor {
  platform: string;
  uid: string;
}

export interface SortedEventResponse {
  ongoing: CalendarEvent[];
  future: CalendarEvent[];
}
