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
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { KeyspaceInterceptor } from '../astra/keyspace.interceptor';
import { Author, AuthorObject } from '../auth/author-headers';
import { Scopes } from '../auth/decorators/scopes.decorator';
import { User } from '../auth/decorators/user.decorator';
import { ScopesGuard } from '../auth/guards/scopes.guard';
import {
  ScopesDictionary,
  TokenPayload,
} from '../auth/interfaces/token-payload.interface';
import { JWTGuard } from '../auth/jwt.strategy';
import { StandupDTO } from './dto/standup.dto';
import { StandupService } from './standup.service';

@ApiTags('Standup')
@Controller('standup')
export class StandupController {
  constructor(private readonly standupService: StandupService) {}

  @Post()
  @UseGuards(JWTGuard, ScopesGuard)
  @ApiBearerAuth()
  @Scopes(ScopesDictionary.WRITE)
  createStandup(@Body() body: StandupDTO, @User() user: TokenPayload) {
    return this.standupService.create(body, user.keyspace);
  }

  @Get()
  @ApiBearerAuth()
  @UseInterceptors(KeyspaceInterceptor)
  @UseGuards(JWTGuard, ScopesGuard)
  @Scopes(ScopesDictionary.READ)
  findAllStandups(@User() user) {
    return this.standupService.findAll(user.keyspace);
  }

  @Get('search')
  @ApiQuery({ name: 'uid', type: 'string' })
  @ApiBearerAuth()
  @UseGuards(JWTGuard, ScopesGuard)
  @Scopes(ScopesDictionary.READ)
  search(@Query('uid') uid: string, @User() user: TokenPayload) {
    return this.standupService.search(uid, user.keyspace);
  }

  @Get(':id')
  @ApiQuery({ name: 'uid', type: 'string' })
  @ApiBearerAuth()
  @UseGuards(JWTGuard, ScopesGuard)
  @Scopes(ScopesDictionary.READ)
  findById(@Param('id') id: string, @User() user: TokenPayload) {
    return this.standupService.findById(id, user.keyspace);
  }

  @Delete(':id')
  @UseGuards(JWTGuard, ScopesGuard)
  @ApiBearerAuth()
  @Scopes(ScopesDictionary.WRITE)
  @HttpCode(204)
  @ApiHeader({ name: 'User-Uid', required: true })
  @ApiHeader({ name: 'Platform', required: true })
  deleteStandup(
    @Param('id') id: string,
    @AuthorObject() author: Author,
    @User() user: TokenPayload,
  ) {
    return this.standupService.deleteStandup(id, author, user.keyspace);
  }
}
