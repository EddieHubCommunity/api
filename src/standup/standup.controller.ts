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
  createStandup(@Body() body: StandupDTO, @User() user: TokenPayload) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JWTGuard, ScopesGuard)
  @Scopes(ScopesDictionary.READ)
  findAllStandups(@User() user) {}

  @Get('search')
  @ApiQuery({ name: 'uid', type: 'string' })
  @ApiBearerAuth()
  @UseGuards(JWTGuard, ScopesGuard)
  @Scopes(ScopesDictionary.READ)
  search(@Query('uid') uid: string, @User() user: TokenPayload) {}

  @Get(':id')
  @ApiQuery({ name: 'uid', type: 'string' })
  @ApiBearerAuth()
  @UseGuards(JWTGuard, ScopesGuard)
  @Scopes(ScopesDictionary.READ)
  findById(@Param('id') id: string, @User() user: TokenPayload) {}

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
  ) {}
}
