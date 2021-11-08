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
  async createStandup(@Body() body: StandupDTO) {
    return this.standupService.create(body);
  }

  @Get()
  async getAllStandups() {
    return await this.standupService.getAll();
  }

  @Get('search')
  @ApiQuery({ name: 'uid', type: 'string' })
  async searchStandupsByUID(@Query('uid') uid: string) {
    return await this.standupService.searchByUID(uid);
  }

  @Get(':id')
  async getStandupByID(@Param('id') id: string) {
    return await this.standupService.getByID(id);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  @ApiHeader({ name: 'User-Uid', required: true })
  @ApiHeader({ name: 'Platform', required: true })
  async deteleStanupByID(
    @Param('id') id: string,
    @AuthorObject() author: Author,
  ) {
    return await this.standupService.deleteByID(id, author);
  }
}
