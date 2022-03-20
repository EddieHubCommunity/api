import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { eventMap } from '../data/event-map';

const events: string[] = Object.keys(eventMap);

export class CreateEventDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, enum: events })
  @IsIn(events)
  event: string;
}
