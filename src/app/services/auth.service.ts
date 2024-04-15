import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:8080/api/';

  userName: string = ""

  constructor(private http: HttpClient) {}

  Login(credentials: any): Observable<any> {
    return this.http.post<any>(this.url + 'auth/login', credentials);
  }

  Register(user: any): Observable<any> {
    return this.http.post<any>(this.url + 'auth/register', user);
  }

  Logout() {
    this.userName = "";
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userToken');
  }

  UserAuthenticate() {
    return sessionStorage.getItem('userToken');
  }

  isAuthenticated() {
    return this.getUser().pipe(
      map((user) => {
        this.userName = JSON.stringify(user);
        sessionStorage.setItem('user', JSON.stringify(user));
        return !!user;
      }),
      catchError(() => of(false))
    );
  }

  getUser() {
    return this.http.get<any>(this.url + 'user');
  }
  
  getUserName() {
    return this.userName;
  }
}
