import { Injectable } from '@angular/core';
import { IList } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }

  getAll(): IList[] {
    return []
  }
}
