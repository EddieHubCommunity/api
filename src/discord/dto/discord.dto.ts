import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SocialsDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  discord?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  twitter?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  linkedin?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  github?: string;
}

export class DiscordDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ type: SocialsDTO, required: false })
  @Type(() => SocialsDTO)
  @ValidateNested()
  @IsOptional()
  socials?: SocialsDTO;
}
