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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiQuery,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Author, AuthorObject } from '../auth/author-headers';
import { User } from '../auth/decorators/user.decorator';
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
  createStandup(@Body() body: StandupDTO) {
    return body;
  }

  @Get()
  findAllStandups(@User() user) {}

  @Get('search')
  @ApiQuery({ name: 'uid', type: 'string' })
  search(@Query('uid') uid: string) {}

  @Get(':id')
  @ApiQuery({ name: 'uid', type: 'string' })
  findById(@Param('id') id: string) {}

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  @ApiHeader({ name: 'User-Uid', required: true })
  @ApiHeader({ name: 'Platform', required: true })
  deleteStandup(@Param('id') id: string, @AuthorObject() author: Author) {}
}
