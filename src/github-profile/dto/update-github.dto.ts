import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateGithubProfileDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  discordUsername: string;
}
