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
} from '@nestjs/common';
import { ApiHeader, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Author, AuthorObject } from '../auth/author-headers';
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
  @ApiHeader({ name: 'keyspace', required: true })
  findAllStandups(@Headers('keyspace') keyspace: string) {
    return this.standupService.findAll(keyspace);
  }

  @Get('search')
  @ApiQuery({ name: 'uid', type: 'string' })
  @ApiHeader({ name: 'keyspace', required: true })
  search(@Query('uid') uid: string, @Headers('keyspace') keyspace: string) {
    return this.standupService.search(uid, keyspace);
  }

  @Get(':id')
  @ApiHeader({ name: 'keyspace', required: true })
  findById(@Param('id') id: string, @Headers('keyspace') keyspace: string) {
    return this.standupService.findById(id, keyspace);
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
