import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URL} from "../utils/constants";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  getStats(): Observable<any> {
    return this.http.get<any>(API_URL + 'admin/dash/stats');
  }

  getGraphs(dates: any): Observable<any> {
    return this.http.post<any>(API_URL + 'admin/dash/graphs',dates);
  }
}
