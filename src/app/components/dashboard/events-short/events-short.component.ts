import { Component, Input } from '@angular/core';
import { MiniUserComponent } from '../../utils/mini-user/mini-user.component';
import { IList } from '../../../models/list';

@Component({
  selector: 'app-events-short',
  standalone: true,
  templateUrl: './events-short.component.html',
  styleUrl: './events-short.component.css',
  imports: [MiniUserComponent],
})
export class EventsShortComponent {
  @Input() list: IList = {} as IList;




  getShortMonth(date: Date) :string{
    return new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(date);
  }

}
