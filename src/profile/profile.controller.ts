import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfileDTO } from './dto/profile.dto';

@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
  @Post()
  createProfile(@Body() body: ProfileDTO) {
    return body;
  }
}
