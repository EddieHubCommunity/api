import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

const types = ['personal', 'community'];
export class PatchUserDTO {
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
