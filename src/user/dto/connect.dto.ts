import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ConnectDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  githubUsername: string;
}
