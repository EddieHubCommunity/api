import { Injectable } from '@nestjs/common';
import { ValidationService } from '../auth/header-validation.service';

@Injectable()
export class CalendarService {
  constructor(
    private readonly validationService: ValidationService,
  ) { }
}
