import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGithubProfileDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  githubUsername: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  discordUsername: string;
}
