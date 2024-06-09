export interface INotification {
  Accepted: boolean;
  CreatedAt: Date;
  Data: Date;
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