import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateGithubProfileDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  discordUsername: string;
}
