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

export interface DiscordProfileAuthor {
  platform: string;
  uid: string;
}
