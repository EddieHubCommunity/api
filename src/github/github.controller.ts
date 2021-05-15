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
import { GithubDTO } from './dto/github.dto';
import { GithubService } from './github.service';
@ApiTags('Github')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}
  @Post()
  @ApiSecurity('token')
  @UseGuards(TokenGuard)
  async create(@Body() body: GithubDTO) {
    return await this.githubService.create(body);
  }

  @Get()
  findAll() {
    return this.githubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.githubService.findOne(id);
  }

  @Put(':id')
  @UseGuards(TokenGuard)
  @HttpCode(200)
  @ApiSecurity('token')
  async update(@Param('id') id: string, @Body() body: GithubDTO) {
    return await this.githubService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.githubService.remove(id);
  }
}
