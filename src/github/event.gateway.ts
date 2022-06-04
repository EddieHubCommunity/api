import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { GithubEventService } from './github-event.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventGateway {
  constructor(private readonly eventService: GithubEventService) {}

  @SubscribeMessage('event')
  findAll(): Observable<WsResponse<any>> {
    return this.eventService.eventObservable.pipe(
      filter((event) => !!event),
      map((event) => {
        return { event: 'events', data: event };
      }),
    );
  }
}
