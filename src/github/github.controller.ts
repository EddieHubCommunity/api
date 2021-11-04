import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from '../auth/token.strategy';
import { GithubDTO } from './dto/github.dto';
import { GithubService } from './github.service';
@ApiTags('Github')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) { }
  @Post()
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  async create(@Body() body: GithubDTO) { }

  @Get()
  findAll() { }

  @Get(':id')
  findOne(@Param('id') id: string) { }

  @Patch(':id')
  @HttpCode(200)
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  async update(
    @Param('id') id: string,
    @Body() body: GithubDTO,
  ) { }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  remove(@Param('id') id: string) { }
}
