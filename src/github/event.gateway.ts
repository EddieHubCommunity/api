import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { GithubEventService } from './github-event.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventGateway {
  constructor(private readonly eventService: GithubEventService) {}

  @SubscribeMessage('createMap')
  create(@MessageBody() createMapDto) {
    console.log(createMapDto);
    return '';
  }

  @SubscribeMessage('findAllMap')
  async findAll() {
    const response = await this.eventService.getAllPopulated();
    console.log(response);
    return response;
  }
}
