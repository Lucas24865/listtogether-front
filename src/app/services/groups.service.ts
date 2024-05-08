import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../utils/constants';
import { IGroup } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) {}
  
  getGroups(): Observable<any> {
    return this.http.get<any>(API_URL + 'groups');
  }

  addGroup(group: IGroup): Observable<any> {
    return this.http.get<any>(API_URL + 'groups');
  }
}
