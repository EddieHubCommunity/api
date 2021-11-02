import { Injectable } from '@nestjs/common';
import { ValidationService } from '../auth/header-validation.service';

@Injectable()
export class StandupService {
  constructor(
    private readonly validationService: ValidationService,
  ) { }

}
