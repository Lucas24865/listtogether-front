import { IUserShort } from './users-shorts';

export interface IGroup {
  name: string;
  desc: string;
  createdBy: IUserShort;
  createdAt: Date;
  members: IUserShort[];
  userRole: number;
}
