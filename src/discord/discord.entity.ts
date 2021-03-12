import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('discord')
export class Discord {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  username: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  socials: {
    discord?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}
