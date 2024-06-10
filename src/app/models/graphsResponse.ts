import {ListType} from "./type";

export interface IDashGraphs {
  UsersCreated: { [key in ListType]: number };
  Logins: { [key in ListType]: number };
  GroupsCreated: { [key in ListType]: number };
  ListsCreated: { [key in ListType]: number };
}
