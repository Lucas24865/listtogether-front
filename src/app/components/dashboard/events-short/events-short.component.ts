import { Component } from '@angular/core';
import { IEvent } from '../../../models/event-short';
import { MiniUserComponent } from '../../utils/mini-user/mini-user.component';

@Component({
  selector: 'app-events-short',
  standalone: true,
  templateUrl: './events-short.component.html',
  styleUrl: './events-short.component.css',
  imports: [MiniUserComponent],
})
export class EventsShortComponent {
  events: IEvent[] = [
    {
      month: 'Mar',
      day: '26',
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
    },
    {
      month: 'Abr',
      day: '29',
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
    },
  ];
}
