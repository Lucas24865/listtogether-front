import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(API_URL + 'notifications');
  }

  accept(id: string) {
    return this.http.put<any>(API_URL + 'notifications/accept/' + id, null);
  }

  decline(id: string) {
    return this.http.put<any>(API_URL + 'notifications/decline/' + id, null);
  }

  deleteRead(){
    return this.http.delete<any>(API_URL + 'notifications');
  }
}
