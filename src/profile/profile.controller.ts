import { Body, Controller, Post } from '@nestjs/common';
import { ProfileDTO } from './dto/profile.dto';

@Controller('profile')
export class ProfileController {
  @Post()
  createProfile(@Body() body: ProfileDTO) {
    return body;
  }
}
