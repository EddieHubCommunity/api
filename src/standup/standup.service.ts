import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { CreateStandupDTO } from './dto/CreateStandup.dto';
import { SearchStandupDTO } from './dto/SearchStandup.dto';
import { IStandup } from './interfaces/Standup.interface';

@Injectable()
export class StandupService {
  private standups: Array<IStandup> = [];
  create(body: CreateStandupDTO): IStandup {
    const { discordUser, todayMessage, yesterdayMessage } = body;

    const newStandup: IStandup = {
      id: Date.now(),
      yesterdayMessage: yesterdayMessage,
      todayMessage: todayMessage,
      discordUser: discordUser,
      createdOn: new Date(Date.now()),
    };

    this.standups.push(newStandup);
    return newStandup;
  }

  findAll(): Array<IStandup> {
    return [...this.standups];
  }

  findById(id: number): IStandup {
    const result = this.standups.find((standup) => standup.id === id);
    if (!result) {
      throw new HttpException('Standup Not Found', HttpStatus.NOT_FOUND);
    }
    return { ...result };
  }

  deleteStandup(id: number) {
    const deleteElement = this.standups.find((standup) => standup.id == id);
    if (!deleteElement) {
      throw new HttpException('Standup Not Found', HttpStatus.NOT_FOUND);
    }
    const updateStandup = this.standups.filter((standup) => standup.id !== id);
    this.standups = [...updateStandup];
    return { message: 'Standup deleted successfully' };
  }

  search(body: SearchStandupDTO) {
    const { discordUser } = body;
    if (!discordUser) {
      throw new HttpException(
        'Please Provice Search Context',
        HttpStatus.BAD_REQUEST,
      );
    }

    const results = this.standups.filter(
      (standup) => standup.discordUser === discordUser,
    );

    if (results.length === 0) {
      throw new HttpException('No Standup found', HttpStatus.NOT_FOUND);
    }

    return [...results];
  }
}
