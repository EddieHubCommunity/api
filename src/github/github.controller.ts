import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Scopes } from '../auth/decorators/scopes.decorator';
import { User } from '../auth/decorators/user.decorator';
import { ScopesGuard } from '../auth/guards/scopes.guard';
import {
  ScopesDictionary,
  TokenPayload,
} from '../auth/interfaces/token-payload.interface';
import { JWTGuard } from '../auth/jwt.strategy';
import { GithubDTO } from './dto/github.dto';
import { GithubService } from './github.service';
@ApiTags('Github')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}
  @Post()
  @UseGuards(JWTGuard, ScopesGuard)
  @ApiBearerAuth()
  @Scopes(ScopesDictionary.WRITE)
  async create(@Body() body: GithubDTO, @User() user: TokenPayload) {}

  @Get()
  @UseGuards(JWTGuard, ScopesGuard)
  @ApiBearerAuth()
  @Scopes(ScopesDictionary.READ)
  findAll(@User() user: TokenPayload) {}

  @Get(':id')
  @UseGuards(JWTGuard, ScopesGuard)
  @ApiBearerAuth()
  @Scopes(ScopesDictionary.READ)
  findOne(@Param('id') id: string, @User() user: TokenPayload) {}

  @Patch(':id')
  @UseGuards(JWTGuard, ScopesGuard)
  @ApiBearerAuth()
  @Scopes(ScopesDictionary.WRITE)
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() body: GithubDTO,
    @User() user: TokenPayload,
  ) {}

  @Delete(':id')
  @UseGuards(JWTGuard, ScopesGuard)
  @ApiBearerAuth()
  @Scopes(ScopesDictionary.WRITE)
  @HttpCode(204)
  remove(@Param('id') id: string, @User() user: TokenPayload) {}
}
