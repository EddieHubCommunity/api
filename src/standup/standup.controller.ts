import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
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
    return this.standupService.create(body);
  }

  @Get()
  findAllStandups() {
    return this.standupService.findAll();
  }

  @Get('search')
  @ApiQuery({ name: 'discordUser', type: 'string' })
  search(@Query() query) {
    return this.standupService.search(query);
  }

  @Get(':id')
  findById(@Param('id', new ParseIntPipe()) id) {
    return this.standupService.findById(id);
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  deleteStandup(@Param('id', new ParseIntPipe()) id: number) {
    return this.standupService.deleteStandup(id);
  }
}
