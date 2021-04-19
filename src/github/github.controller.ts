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
import { CombinedGuard } from 'src/auth/Combined.strategy';
import { GithubDTO } from './dto/github.dto';
import { GithubService } from './github.service';
@ApiTags('Github')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}
  @Post()
  @UseGuards(CombinedGuard)
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
  @UseGuards(CombinedGuard)
  @HttpCode(200)
  update(@Param('id', new ParseIntPipe()) id: number, @Body() body: GithubDTO) {
    return this.githubService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(CombinedGuard)
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.githubService.remove(id);
  }
}
