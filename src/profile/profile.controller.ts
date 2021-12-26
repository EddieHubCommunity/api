import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfileDTO } from './dto/profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Post()
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
}
