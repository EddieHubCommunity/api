import { ApiProperty } from '@nestjs/swagger';

export class SocialsDTO {
  @ApiProperty()
  discord?: string;
  @ApiProperty()
  twitter?: string;
  @ApiProperty()
  linkedin?: string;
  @ApiProperty()
  github?: string;
}

export class DiscordDTO {
  @ApiProperty()
  username: string;
  @ApiProperty({ required: false })
  bio?: string;
  @ApiProperty({ type: SocialsDTO })
  socials?: SocialsDTO;
}
