export class CreateDiscordDto {
  id: number;
  username: string;
  bio: string;
  socials?: {
    discord?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  updatedOn: Date;
  createdOn: Date;
}
