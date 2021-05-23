import { Injectable } from '@nestjs/common';
import { Author } from '../util/getAuthorFromHeaders.decorator';

@Injectable()
export class ValidationService {
  public validateAuthor(
    objectAuthor: Author,
    headerUid: string | string[],
    headerPlatform: string | string[],
  ) {
    if (objectAuthor.uid !== headerUid) return false;
    if (objectAuthor.platform !== headerPlatform) return false;

    return true;
  }
}
