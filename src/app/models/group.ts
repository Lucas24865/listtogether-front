import { IUserShort } from './users-shorts';

export interface IGroup {
  name: string;
  desc: string;
  createdBy: IUserShort;
  userRole: number;
}
