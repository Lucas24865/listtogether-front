import { IUser } from './user';

export interface IGroup {
  Id: string;
  Name: string;
  Desc: string;
  CreatedBy: IUser;
  CreatedAt: Date;
  Members: IUser[];
  Admins: IUser[];
  Lists: number;
}
