import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Headers,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from '../auth/token.strategy';
import { CreateGithubProfileDTO } from './dto/create-github.dto';
import { CreateEventDTO } from './dto/create-events.dto';
import { GithubEventService } from './github-event.service';
import { GithubProfileService } from './github-profile.service';
import { mapEvent } from './data/event-map';
import { GithubWebhookGuard } from './guards/webhook.guard';

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
    return this.eventService.getAll();
  }

  @Post('events')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  async createEvents(@Body() body: CreateEventDTO) {
    const existingProfile = await this.githubService.getUserFromDatabase(
      body.githubUsername,
    );

    let createdObject = null;
    if (existingProfile) {
      createdObject = await this.eventService.create(
        body.githubUsername,
        mapEvent(body.event),
        true,
      );
    }
    if (createdObject) {
      this.eventService.emitEvent(createdObject);
    }
    return this.githubService.bumpEvent(body);
  }

  @Post('events/webhook')
  @UseGuards(GithubWebhookGuard)
  @ApiSecurity('github-webhook')
  async createEventByWebhook(@Body() body, @Headers() headers) {
    const eventName = headers['x-github-event'];
    const existingProfile = await this.githubService.getUserFromDatabase(
      body.sender.login,
    );

    let createdObject = null;
    if (existingProfile) {
      createdObject = await this.eventService.create(
        body.sender.login,
        mapEvent(eventName),
        true,
      );
    }
    if (createdObject) {
      this.eventService.emitEvent(createdObject);
    }
    return this.githubService.bumpEvent({
      event: eventName,
      githubUsername: body.sender.login,
    });
  }

  @Get('events/:id')
  async getOneEvent(@Param('id') id: string) {
    return this.eventService.getOne(id);
  }

  @Get()
  findAll() {
    return this.githubService.findAll();
  }

  @Get('EddieHubCommunity')
  findEddiehub() {
    return this.githubService.findEddiehub();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.githubService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  @HttpCode(204)
  @ApiSecurity('token')
  async deleteOne(@Param('id') id: string) {
    await this.githubService.deleteOne(id);
    return this.eventService.deleteByUsername(id);
  }

  @Put(':id')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  updateOne(@Param('id') id: string) {
    return this.githubService.updateOne(id);
  }

  @Get(':id/events')
  async findEvents(@Param('id') id: string) {
    return this.eventService.getByUsername(id);
  }
}
