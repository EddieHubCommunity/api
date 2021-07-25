import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { TokensService } from './tokens.service';
import { AuthDTO } from './dto/auth.dto';
import { TokenGuard } from './token.strategy';

@ApiTags('Tokens')
@Controller('auth/tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get(':keyspace')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  getTokens(@Param('keyspace') keyspace: string) {
    return this.tokensService.findAll(keyspace);
  }

  @Post()
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  register(@Body() body: AuthDTO) {
    return this.tokensService.register(body);
  }

  @Post('validate')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  @HttpCode(200)
  validateClient(@Body() body) {
    return this.tokensService.validateClient(body);
  }

  @Delete(':token')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  @HttpCode(204)
  deleteClient(@Param('token') token: string) {
    return this.tokensService.removeClient(token);
  }
}
