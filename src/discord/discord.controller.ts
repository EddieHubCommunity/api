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
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Author, AuthorObject } from '../auth/author-headers';
import { Scopes } from '../auth/decorators/scopes.decorator';
import { User } from '../auth/decorators/user.decorator';
import { ScopesGuard } from '../auth/guards/scopes.guard';
import {
  ScopesDictionary,
  TokenPayload,
} from '../auth/interfaces/token-payload.interface';
import { JWTGuard } from '../auth/jwt.strategy';
import { DiscordService } from './discord.service';
import { DiscordDTO } from './dto/discord.dto';
@ApiTags('Discord')
@Controller('discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Post()
  @UseGuards(JWTGuard, ScopesGuard)
  @ApiBearerAuth()
  @Scopes(ScopesDictionary.WRITE)
  create(@Body() createDiscordDto: DiscordDTO, @User() user: TokenPayload) {
    return this.discordService.create(createDiscordDto, user.keyspace);
  }

  @Get()
  @UseGuards(JWTGuard, ScopesGuard)
  @ApiBearerAuth()
  @Scopes(ScopesDictionary.READ)
  findAll(@User() user: TokenPayload) {
    return this.discordService.findAll(user.keyspace);
  }

  @Get(':id')
  @UseGuards(JWTGuard, ScopesGuard)
  @ApiBearerAuth()
  @Scopes(ScopesDictionary.READ)
  findOne(@Param('id') id: string, @User() user: TokenPayload) {
    return this.discordService.findOne(id, user.keyspace);
  }

  @Patch(':id')
  @UseGuards(JWTGuard, ScopesGuard)
  @ApiBearerAuth()
  @Scopes(ScopesDictionary.WRITE)
  @ApiHeader({ name: 'User-Uid', required: true })
  update(
    @Param('id') id: string,
    @Body() updateDiscordDto: DiscordDTO,
    @AuthorObject() author: Author,
    @User() user: TokenPayload,
  ) {
    return this.discordService.update(
      id,
      updateDiscordDto,
      author,
      user.keyspace,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiHeader({ name: 'User-Uid', required: true })
  @UseGuards(JWTGuard, ScopesGuard)
  @ApiBearerAuth()
  @Scopes(ScopesDictionary.WRITE)
  remove(
    @Param('id') id: string,
    @AuthorObject() author: Author,
    @User() user: TokenPayload,
  ) {
    return this.discordService.remove(id, author, user.keyspace);
  }
}
