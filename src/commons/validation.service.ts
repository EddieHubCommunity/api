import { Injectable } from '@nestjs/common';
import { Author } from '../util/getAuthorFromHeaders.decorator';

@Injectable()
export class ValidationService {
  public validateAuthor(headersAuthor: Author, uid: string, platform?: string) {
    if (headersAuthor.uid !== uid) return false;
    if (platform) {
      if (headersAuthor.platform !== platform) return false;
    }
    return true;
  }
}
