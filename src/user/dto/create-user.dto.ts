import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

const types = ["personal", "community"]

export class CreateUserDTO {
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
  @ApiProperty({ enum: types })
  @IsIn(types)
  type: string;
}
