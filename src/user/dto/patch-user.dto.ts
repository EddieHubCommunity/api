import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PatchUserDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  bio: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  avatar: string;
}
