import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { KeyspaceInterceptor } from '../astra/keyspace.interceptor';
import { AuthService } from './auth.service';
import { AuthDTO, TokenValidationDTO } from './dto/auth.dto';
import { TokenGuard } from './token.strategy';

@ApiTags('Auth')
@UseInterceptors(KeyspaceInterceptor)
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
  @HttpCode(200)
  validateToken(@Body() body: TokenValidationDTO) {
    const valid = this.authService.validateToken(body.token);
    return { valid };
  }
}
