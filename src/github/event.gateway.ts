import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { map } from 'rxjs/operators';
import { GithubEventService } from './github-event.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventGateway {
  constructor(private readonly eventService: GithubEventService) {}

  @SubscribeMessage('event')
  findAll() {
    return this.eventService.eventObservable.pipe(
      map((event) => {
        return { event: 'events', data: event };
      }),
    );
  }
}
