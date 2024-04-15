import { IUser } from './user';

export interface IItem {
  date: Date;
  added: Date;
  title: string;
  desc: string;
  users: IUser[];
  addedBy: IUser;
  total: number;
  got: number;
  completed: boolean;
}
