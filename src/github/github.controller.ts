import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Github')
@Controller('github')
export class GithubController {}
