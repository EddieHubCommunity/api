import { Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('github-profile')
export class GithubProfileController {
    @Get(":id")
    findOne(@Param("id") id: string) { }

    @Get()
    findAll() { }

    @Post()
    createOne() { }

    @Delete(":id")
    deleteOne(@Param("id") id: string) { }
}
