import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStandupDTO } from './dto/CreateStandup.dto';
import { Standup } from './interfaces/standup.interface';

@Injectable()
export class StandupService {
  private standups: Array<Standup> = [];

  create(body: CreateStandupDTO): Standup {
    const { discordUser, todayMessage, yesterdayMessage } = body;

    const newStandup: Standup = {
      id: 123,
      yesterdayMessage: yesterdayMessage,
      todayMessage: todayMessage,
      discordUser: discordUser,
      createdOn: new Date('2021-01-01T00:00:00.000Z'),
    };
    if (!newStandup.discordUser) {
      throw new HttpException('Incomplete data', HttpStatus.BAD_REQUEST);
    }
    this.standups.push(newStandup);

    return newStandup;
  }

  findAll(): Array<Standup> {
    return [...this.standups];
  }

  findById(id: number): Standup {
    const result = this.standups.find((standup) => standup.id === id);
    if (!result) {
      throw new HttpException('Standup not found', HttpStatus.NOT_FOUND);
    }

    return { ...result };
  }

  deleteStandup(id: number) {
    const deleteElement = this.standups.find((standup) => standup.id == id);
    if (!deleteElement) {
      throw new HttpException('Standup not found', HttpStatus.NOT_FOUND);
    }
    const updateStandup = this.standups.filter((standup) => standup.id !== id);
    this.standups = [...updateStandup];

    return {};
  }

  search(query) {
    const { discordUser } = query;
    if (!discordUser) {
      throw new HttpException(
        'Please provide search context',
        HttpStatus.BAD_REQUEST,
      );
    }
    const results = this.standups.filter(
      (standup) => standup.discordUser === discordUser,
    );

    return [...results];
  }
}
