import { ListType } from './type';
import { IItem, IItemResponse } from './item';
import { IGroup } from './group';
import { IUser } from './user';

export interface IList {
  Id: string;
  Name: string;
  Desc: string;
  GroupId: string;
  Items: IItem[];
  Type: ListType;
  CreatedAt: string;
  CreatedBy: string;
}

export interface IListResponse {
  Id: string;
  Name: string;
  Desc: string;
  Group: IGroup;
  Items: IItemResponse[];
  Type: ListType;
  CreatedAt: string;
  CreatedBy: IUser;
}
