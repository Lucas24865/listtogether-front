export interface INotification {
  Accepted: boolean;
  CreatedAt: Date;
  Data: string;
  Detail: string;
  Group: string;
  UserOwner:string;
  ListName:string;
  Deleted: boolean;
  Id: string;
  Message: string;
  Read: boolean;
  User: string;
  Type: string;
}
export interface INotificationMessage {
  Accepted: boolean;
  Id: string;
}
