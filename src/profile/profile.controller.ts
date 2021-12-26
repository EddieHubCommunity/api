import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from '../auth/token.strategy';
import { ProfileDTO } from './dto/profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Post()
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  async createProfile(@Body() body: ProfileDTO) {
    return await this.profileService.create(body);
  }

  @Get()
  async findAll() {
    return await this.profileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.profileService.findByID(id);
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  @ApiSecurity('token')
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    return await this.profileService.deleteByID(id);
  }
}
