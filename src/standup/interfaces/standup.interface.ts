export interface Standup {
  yesterdayMessage: string;
  todayMessage: string;
  author: StandupAuthor;
  createdOn: Date;
}
export interface StandupAuthor {
  platform: string;
  uid: string;
}
