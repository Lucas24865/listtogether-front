import { IUserShort } from './users-shorts';

export interface IItem {
  date: Date;
  added: Date;
  title: string;
  desc: string;
  users: IUserShort[];
  addedBy: IUserShort;
  total: number;
  got: number;
  completed: boolean;
}
