import { IUser } from './user';
import { IGroup } from './group';
import { ListType } from './type';
import { IItem } from './item';

export interface IList {
  title: string;
  createdBy: IUser;
  limitDate: Date;
  group: IGroup;
  type: ListType;
  items: IItem[];
}
