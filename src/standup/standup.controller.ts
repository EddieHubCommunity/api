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
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { DiscordGithubGuard } from 'src/auth/discordGithub.strategy';
import { CreateStandupDTO } from './dto/createStandup.dto';
import { StandupService } from './standup.service';

@ApiTags('Standup')
@Controller('standup')
export class StandupController {
  constructor(private readonly standupService: StandupService) {}

  @Post()
  @UseGuards(DiscordGithubGuard)
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
  @UseGuards(DiscordGithubGuard)
  deleteStandup(@Param('id', new ParseIntPipe()) id: number) {
    return this.standupService.deleteStandup(id);
  }
}
