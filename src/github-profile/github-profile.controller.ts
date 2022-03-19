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
import { UpdateGithubProfileDTO } from './dto/update-github.dto';
import { GithubProfileService } from './github-profile.service';

@ApiTags('Github Profile')
@Controller('github')
export class GithubProfileController {
  constructor(private readonly githubService: GithubProfileService) {}
  @Post()
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  createOne(@Body() body: CreateGithubProfileDTO) {
    return this.githubService.create(body.githubUsername, body.discordUsername);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.githubService.findOne(id);
  }

  @Get()
  findAll() {
    return this.githubService.findAll();
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
  updateOne(@Param('id') id: string, @Body() body: UpdateGithubProfileDTO) {
    return this.githubService.updateOne(id, body.discordUsername);
  }
}
