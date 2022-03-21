import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGithubProfileDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  githubUsername: string;
}
