export interface IUser {
    Picture: string;
    Name: string;
    Color: string;
    User:string;
    Pass: string;
    Mail: string;
    CreatedAt: string;
  }

export interface IUserRequest {
    Name: string;
    Color: string;
    User:string;
    OldPass: string;
    NewPass: string;
}
