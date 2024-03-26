import { IUserShort } from './users-shorts';
import { IGroup } from './group';
import { ListType } from './type';
import { IItem } from './item';

export interface IList {
  title: string;
  createdBy: IUserShort;
  limitDate: Date;
  group: IGroup;
  type: ListType;
  items: IItem[];
}
