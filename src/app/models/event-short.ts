import { IUserShort } from './users-shorts';

export interface IEvent {
  month: string;
  day: string;
  title: string;
  desc: string;
  users: IUserShort[];
}
