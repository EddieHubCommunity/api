export interface DiscordProfile {
  username: string;
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
