import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {API_URL} from '../utils/constants';
import {IGroupRequest} from '../models/groupRequest';

@Injectable({
    providedIn: 'root',
})
export class GroupsService {
    constructor(private http: HttpClient) {
    }

    getGroups(): Observable<any> {
        return this.http.get<any>(API_URL + 'admin/groups');
    }

    getGroup(id: string): Observable<any> {
        return this.http.get<any>(API_URL + 'groups/' + id);
    }

    addGroup(group: IGroupRequest): Observable<any> {
        return this.http.post<any>(API_URL + 'groups', group);
    }

    editGroup(group: IGroupRequest): Observable<any> {
        return this.http.put<any>(API_URL + 'groups', group);
    }
}
