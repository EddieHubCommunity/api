import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from '../auth/token.strategy';
import { CreateGithubProfileDTO } from './dto/create-github.dto';
import { CreateEventDTO } from './dto/create-events.dto';
import { GithubEventService } from './github-event.service';
import { GithubProfileService } from './github-profile.service';

@ApiTags('Github')
@Controller('github')
export class GithubController {
  constructor(
    private readonly githubService: GithubProfileService,
    private readonly eventService: GithubEventService,
  ) {}

  @Post()
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  createOne(@Body() body: CreateGithubProfileDTO) {
    return this.githubService.create(body.githubUsername);
  }

  @Get('events')
  async getAllEvents() {
    return await this.eventService.getAll();
  }

  @Get('events/:id')
  async getOneEvent(@Param('id') id: string) {
    return await this.eventService.getOne(id);
  }

  @Get()
  findAll() {
    return this.githubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.githubService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  @HttpCode(204)
  @ApiSecurity('token')
  deleteOne(@Param('id') id: string) {
    return this.githubService.deleteOne(id);
  }

  @Put(':id')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  updateOne(@Param('id') id: string) {
    return this.githubService.updateOne(id);
  }

  @Post(':id/events')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  createEvents(@Param('id') id: string, @Body() body: CreateEventDTO) {
    return this.githubService.bumpEvent(id, body);
  }

  @Get(':id/events')
  async findEvents(@Param('id') id: string) {
    return await this.eventService.getByUsername(id);
  }
}
