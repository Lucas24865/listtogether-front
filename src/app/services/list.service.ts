import { HttpClient } from '@angular/common/http';
import { API_URL } from '../utils/constants';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IList, IListResponse } from '../models/list';
import { IItem } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(API_URL + 'lists');
  }

  get(id: string): Observable<any> {
    return this.http.get<any>(API_URL + 'lists/' + id);
  }

  createList(list: IList): Observable<any> {
    return this.http.post<any>(API_URL + 'lists', list);
  }

  updateList(list: IList): Observable<any> {
    return this.http.put<any>(API_URL + 'lists', list);
  }

  createItem(item: IItem): Observable<any> {
    return this.http.post<any>(API_URL + 'lists/item', item);
  }

  deleteList(id: string): Observable<any> {
    return this.http.delete<any>(API_URL + 'lists/' + id);
  }
}
