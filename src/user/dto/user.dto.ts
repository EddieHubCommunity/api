import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  discordUsername: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  githubUsername: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  bio: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  avatar: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  type: string;
}
