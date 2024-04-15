import { Injectable } from '@angular/core';
import { IGroup } from '../models/group';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class TestGroupService {
  constructor() {}
  getData(): IGroup[] {
    const Lucas = {
      picture: '',
      name: 'Lucas',
      color: 'black',
    } as IUser;
    const Ce = {
      picture: '',
      name: 'Celi',
      color: 'green',
    } as IUser;
    const Juan = {
      picture: '',
      name: 'Juan',
      color: 'red',
    } as IUser;
    const Joa = {
      picture: '',
      name: 'Joa',
      color: 'orange',
    } as IUser;

    const groupF = {
      name: 'Familia',
      desc: 'Descripción del grupo',
      createdBy: Ce,
      createdAt: new Date(),
      members: [Lucas,Ce],
      userRole: 1,
    } as IGroup;
    const groupA = {
      name: 'Amigos',
      desc: 'Descripción del grupo',
      createdBy: Juan,
      members: [Lucas,Juan,Joa],
      createdAt: new Date(),
      userRole: 1,
    } as IGroup;

    let groups: IGroup[] = [];
    groups.push(groupF);
    groups.push(groupA);
    return groups;
  }
}
