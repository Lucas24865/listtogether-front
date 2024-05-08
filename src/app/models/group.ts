import { IUser } from './user';

export interface IGroup {
  name: string;
  desc: string;
  createdBy: IUser;
  createdAt: Date;
  members: IUser[];
  admins: IUser[];
  lists: number;
}
