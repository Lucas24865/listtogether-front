import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { API_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userName: string = ""

  constructor(private http: HttpClient) {}

  Login(credentials: any): Observable<any> {
    return this.http.post<any>(API_URL + 'auth/login', credentials);
  }

  Register(user: any): Observable<any> {
    return this.http.post<any>(API_URL + 'auth/register', user);
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
    return this.http.get<any>(API_URL + 'user');
  }
  
  getUserName() {
    return this.userName;
  }
}
