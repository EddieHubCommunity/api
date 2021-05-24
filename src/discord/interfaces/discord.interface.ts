import { Author } from '../../auth/getAuthorFromHeaders.decorator';

export interface DiscordProfile {
  author: DiscordProfileAuthor;
  bio?: string;
  socials?: DiscordProfileSocials;
  createdOn: Date;
  updatedOn: Date;
}

export interface DiscordProfileSocials {
  discord?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
}

export interface DiscordProfileAuthor extends Author {
  platform: string;
  uid: string;
}
