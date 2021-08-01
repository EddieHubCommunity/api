import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsNotEmpty, IsString } from 'class-validator';

const scopes = ['Data.Read', 'Data.Write'];

export class AuthDTO {
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @IsIn(scopes, { each: true })
  @ApiProperty({
    required: true,
    enum: scopes,
    isArray: true,
  })
  scopes: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  serverId: string;
}

export class TokenValidationDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  token: string;
}
