import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiscordStrategy } from 'src/auth/Discord.strategy';
import { GithubGuard } from 'src/auth/Github.strategy';
import { GithubDTO } from './dto/github.dto';
import { GithubService } from './github.service';
@ApiTags('Github')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}
  @Post()
  @UseGuards(GithubGuard)
  @UseGuards(DiscordStrategy)
  create(@Body() body: GithubDTO) {
    return this.githubService.createGithub(body);
  }

  @Get()
  findAll() {
    return this.githubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.githubService.findOne(id);
  }

  @Put(':id')
  @UseGuards(GithubGuard)
  @UseGuards(DiscordStrategy)
  @HttpCode(200)
  update(@Param('id', new ParseIntPipe()) id: number, @Body() body: GithubDTO) {
    return this.githubService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(GithubGuard)
  @UseGuards(DiscordStrategy)
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.githubService.remove(id);
  }
}
