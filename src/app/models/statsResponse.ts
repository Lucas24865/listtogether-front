import {ListType} from "./type";

export interface IDashStats {
  Users         :number
  Groups        :number
  Lists         :number
  Items         :number
  ListsTypes: { [key in ListType]: number };
  ElementsTypes: { [key in ListType]: number };
}
