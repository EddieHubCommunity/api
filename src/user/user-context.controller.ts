import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PatchUserDTO } from './dto/patch-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user/:id')
export class UserContextController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Patch('')
  async patch(@Param('id') id: string, @Body() body: PatchUserDTO) {
    return await this.userService.patch(body, id);
  }

  @Delete('')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
