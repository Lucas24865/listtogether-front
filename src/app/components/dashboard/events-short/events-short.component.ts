import { Component } from '@angular/core';
import { MiniUserComponent } from '../../utils/mini-user/mini-user.component';
import { IDashItem } from '../../../models/dash-item';

@Component({
  selector: 'app-events-short',
  standalone: true,
  templateUrl: './events-short.component.html',
  styleUrl: './events-short.component.css',
  imports: [MiniUserComponent],
})
export class EventsShortComponent {
  events: IDashItem[] = [
    {
      date: new Date('2024-05-26'),
      added: new Date(),
      title: 'Cumple Sofi',
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
  getShortMonth(date: Date) :string{
    return new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(date);
  }

}
