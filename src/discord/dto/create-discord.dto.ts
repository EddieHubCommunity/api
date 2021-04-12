import { ApiProperty } from '@nestjs/swagger';

class Socials {
  @ApiProperty()
  discord?: string;
  @ApiProperty()
  twitter?: string;
  @ApiProperty()
  linkedin?: string;
  @ApiProperty()
  github?: string;
}

export class CreateDiscordDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  bio?: string;
  @ApiProperty({ type: [Socials] })
  socials?: {
    discord?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}
