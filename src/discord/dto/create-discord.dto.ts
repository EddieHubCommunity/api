export class CreateDiscordDto {
  id: number;
  username: string;
  bio: {
    description: string;
    twitter: string;
    linkedin: string;
    github: string;
  };
  updatedOn: Date;
  createdOn: Date;
}
