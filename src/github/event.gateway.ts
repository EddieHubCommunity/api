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
  transports: ['websocket', 'polling'],
})
export class EventGateway {
  constructor(private readonly eventService: GithubEventService) {}

  @SubscribeMessage('github-event')
  findAll(): Observable<WsResponse<any>> {
    return this.eventService.eventObservable.pipe(
      filter((event) => !!event),
      map((event) => {
        return { event: 'events/github', data: event };
      }),
    );
  }
}
