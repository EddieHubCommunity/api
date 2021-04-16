import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateStandupDTO } from './dto/CreateStandup.dto';
import { StandupService } from './standup.service';

@ApiTags('Standup')
@Controller('standup')
export class StandupController {
  constructor(private readonly standupService: StandupService) {}

  @Post()
  createStandup(@Body() body: CreateStandupDTO) {
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
  deleteStandup(@Param('id', new ParseIntPipe()) id: number) {
    return this.standupService.deleteStandup(id);
  }
}
