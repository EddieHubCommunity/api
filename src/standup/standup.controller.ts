import {
  Headers,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiQuery,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Author, AuthorObject } from '../auth/author-headers';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';
import { JWTGuard, MyAuthGuard } from '../auth/jwt.strategy';
import { TokenGuard } from '../auth/token.strategy';
import { StandupDTO } from './dto/standup.dto';
import { StandupService } from './standup.service';

@ApiTags('Standup')
@Controller('standup')
export class StandupController {
  constructor(private readonly standupService: StandupService) {}

  @Post()
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  @ApiHeader({ name: 'keyspace', required: true })
  createStandup(
    @Body() body: StandupDTO,
    @Headers('keyspace') keyspace: string,
  ) {
    return this.standupService.create(body, keyspace);
  }

  @Get()
  @ApiBearerAuth()
  @ApiSecurity('token')
  @UseGuards(new MyAuthGuard())
  findAllStandups(@Req() req) {
    const user: TokenPayload = req.user;
    return this.standupService.findAll(user.keyspace);
  }

  @Get('search')
  @ApiQuery({ name: 'uid', type: 'string' })
  @ApiBearerAuth()
  @UseGuards(JWTGuard)
  search(@Query('uid') uid: string, @Req() req) {
    const user: TokenPayload = req.user;
    return this.standupService.search(uid, user.keyspace);
  }

  @Get(':id')
  @ApiQuery({ name: 'uid', type: 'string' })
  @ApiBearerAuth()
  findById(@Param('id') id: string, @Req() req) {
    const user: TokenPayload = req.user;
    return this.standupService.findById(id, user.keyspace);
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  @HttpCode(204)
  @ApiHeader({ name: 'User-Uid', required: true })
  @ApiHeader({ name: 'Platform', required: true })
  @ApiHeader({ name: 'keyspace', required: true })
  deleteStandup(
    @Param('id') id: string,
    @AuthorObject() author: Author,
    @Headers('keyspace') keyspace: string,
  ) {
    return this.standupService.deleteStandup(id, author, keyspace);
  }
}
