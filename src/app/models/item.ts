import { IUser } from './user';

export interface IItem {
  Id: string;
  Name: string;
  Quantity: string;
  Desc: string;
  Completed: boolean;
  CreatedAt: string;
  CreatedBy: string;
  LimitDate: string;
  CompletedBy: string;
}

export interface IItemResponse {
  Id: string;
  Name: string;
  Quantity: string;
  Desc: string;
  Completed: boolean;
  CreatedAt: string;
  CreatedBy: IUser;
  LimitDate: string;
  CompletedBy: IUser;
}
