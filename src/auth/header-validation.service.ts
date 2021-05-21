import { Injectable } from '@nestjs/common';
import { CalendarEventAuthor } from '../calendar/interfaces/calendar.interface';
import { DiscordProfileAuthor } from '../discord/interfaces/discord.interface';
import { StandupAuthor } from '../standup/interfaces/standup.interface';

@Injectable()
export class ValidationService {
  public validateAuthor(
    objectAuthor: CalendarEventAuthor | DiscordProfileAuthor | StandupAuthor,
    headerUid: string | string[],
    headerPlatform: string | string[],
  ) {
    if (objectAuthor.uid !== headerUid) return false;
    if (objectAuthor.platform !== headerPlatform) return false;

    return true;
  }
}
