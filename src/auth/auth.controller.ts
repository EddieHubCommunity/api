import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDTO, TokenValidationDTO } from './dto/auth.dto';
import { TokenGuard } from './token.strategy';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token/:keyspace')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  @ApiParam({ name: 'keyspace', required: true })
  getTokens(@Param('keyspace') keyspace: string) {
    return this.authService.getClientIds(keyspace);
  }

  @Post('token')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  register(@Body() body: AuthDTO) {
    return this.authService.register(body);
  }

  @Delete('token')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  @ApiQuery({
    name: 'token',
    description: 'Token to delete',
    required: true,
  })
  @HttpCode(204)
  deleteClient(@Query() query) {
    return this.authService.removeClient(query.token);
  }

  @Post('validate')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  validateToken(@Body() body: TokenValidationDTO, @Res() response: Response) {
    const valid = this.authService.validateToken(body.token, response);
    if (!valid) {
      response.status(HttpStatus.BAD_REQUEST).json({ valid });
    }
    response.status(HttpStatus.OK).json({ valid });
  }
}
