import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {API_URL} from "../utils/constants";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  Update(user: IUser): Observable<any> {
    return this.http.post<any>(API_URL + 'user', user);
  }
}
