import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }

  @Get()
  async getGithub() {
    return await this.userService.findAll();
  }
}
