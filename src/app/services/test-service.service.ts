import { Injectable } from '@angular/core';
import { IList } from '../models/list';
import { IItem } from '../models/item';
import { ListType } from '../models/type';
import { IGroup } from '../models/group';

@Injectable({
  providedIn: 'root',
})
export class TestServiceService {
  constructor() {}

  getData(): IList[] {
    const pendingAccountsF: IItem[] = [
      {
        date: new Date(),
        added: new Date(),
        title: 'Luz',
        desc: 'Factura de luz del mes',
        users: [],
        addedBy: {
          picture: '',
          name: 'Admin',
          color: 'blue',
          doubleSize: false,
        },
        total: 15000,
        got: 0,
      },
      {
        date: new Date(),
        added: new Date(),
        title: 'Internet',
        desc: 'Factura de internet del mes',
        users: [
          {
            picture: '',
            name: 'Lucas',
            color: 'blue',
            doubleSize: false,
          },
        ],
        addedBy: {
          picture: '',
          name: 'Admin',
          color: 'blue',
          doubleSize: false,
        },
        total: 10000,
        got: 5000,
      },
    ];
    const eventsF: IItem[] = [
      {
        date: new Date('2024-05-26'),
        added: new Date(),
        title: 'Cumple Celi',
        desc: 'En casa de la tia, no olvidar llevar todo',
        users: [
          {
            picture: '',
            name: 'Lucas',
            doubleSize: false,
            color: 'red',
          },
        ],
        addedBy: {
          picture: '',
          name: 'Admin',
          doubleSize: false,
          color: 'blue',
        },
        total: 10,
        got: 5,
      },
      {
        date: new Date('2024-04-29'),
        added: new Date(),
        title: 'Cumple Mati',
        desc: 'En casa del tio, no olvidar llevar todo',
        users: [
          {
            picture: '',
            name: 'Ce',
            doubleSize: false,
            color: 'green',
          },
        ],
        addedBy: {
          picture: '',
          name: 'Admin',
          doubleSize: false,
          color: 'blue',
        },
        total: 20,
        got: 15,
      },
    ];
    const accountListF = {
      title: 'Cuentas pendientes',
      createdBy: {
        picture: '',
        name: 'Lucas',
        color: 'red',
        doubleSize: false,
      },
      limitDate: new Date(),
      group: {
        name: 'Familia',
        desc: 'Descripción del grupo',
        createdBy: {
          picture: 'imagen.jpg',
          name: 'Usuario',
          color: '#000',
          doubleSize: false,
        },
        userRole: 1,
      },
      type: ListType.accounting,
      items: pendingAccountsF,
    };
    const eventsListF = {
      title: 'Proximos eventos',
      createdBy: {
        picture: '',
        name: 'Ce',
        color: 'green',
        doubleSize: false,
      },
      limitDate: new Date(),
      group: {
        name: 'Familia',
        desc: 'Descripción del grupo',
        createdBy: {
          picture: 'imagen.jpg',
          name: 'Usuario',
          color: '#000',
          doubleSize: false,
        },
        userRole: 1,
      },
      type: ListType.event,
      items: eventsF,
    };
    const events: IItem[] = [
      {
        date: new Date('2024-04-11'),
        added: new Date(),
        title: 'Cumple Juan',
        desc: 'Llevar gaseosas',
        users: [
          {
            picture: '',
            name: 'Juan',
            doubleSize: false,
            color: 'orange',
          },
        ],
        addedBy: {
          picture: '',
          name: 'Admin',
          doubleSize: false,
          color: 'blue',
        },
        total: 10,
        got: 5,
      },
      {
        date: new Date('2024-05-19'),
        added: new Date(),
        title: 'Asado en casa de Lucas',
        desc: 'Calle 123',
        users: [
          {
            picture: '',
            name: 'Ce',
            doubleSize: false,
            color: 'black',
          },
        ],
        addedBy: {
          picture: '',
          name: 'Admin',
          doubleSize: false,
          color: 'blue',
        },
        total: 20,
        got: 15,
      },
    ];
    const eventsList = {
      title: 'Proximos eventos',
      createdBy: {
        picture: '',
        name: 'Ce',
        color: 'green',
        doubleSize: false,
      },
      limitDate: new Date(),
      group: {
        name: 'Amigos',
        desc: 'Descripción del grupo',
        createdBy: {
          picture: 'imagen.jpg',
          name: 'Usuario',
          color: '#000',
          doubleSize: false,
        },
        userRole: 1,
      },
      type: ListType.event,
      items: events,
    };
    let list = {} as IList;
    let list2 = {} as IList;
    let lists = [] as IList[];
    list.title = "Notas"
    list.group = {} as IGroup;
    list.group.name = "Familia"
    lists.push(accountListF);
    lists.push(eventsListF);
    list.type = ListType.note;
    lists.push(list);
    lists.push(eventsList);
    list2.title = "Recordatorios"
    list2.group = {} as IGroup;
    list2.group.name = "Familia"
    list2.type = ListType.reminder;
    lists.push(list2);

    return lists;
  }
}
