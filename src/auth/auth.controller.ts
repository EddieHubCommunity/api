import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { TokenGuard } from './token.strategy';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  @ApiQuery({ name: 'keyspace', required: true })
  getTokens(@Query('keyspace') keyspace: string) {
    return this.authService.getClientIds(keyspace);
  }

  @Post()
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  // @ApiHeader({ name: 'keyspace', description: 'Keyspace', required: true })
  register(@Body() body: AuthDTO) {
    return this.authService.register(body);
  }

  @Delete()
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
}
