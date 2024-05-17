import { Component, Input } from '@angular/core';
import { MiniUserComponent } from '../../utils/mini-user/mini-user.component';
import { IListResponse } from '../../../models/list';

@Component({
  selector: 'app-events-short',
  standalone: true,
  templateUrl: './events-short.component.html',
  styleUrl: './events-short.component.css',
  imports: [MiniUserComponent],
})
export class EventsShortComponent {
  @Input() list: IListResponse = {} as IListResponse;




  getShortMonth(dateString: string): string{
    const date = new Date(dateString);
    const monthAbbr = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const monthAbbrCapitalized = monthAbbr.charAt(0).toUpperCase() + monthAbbr.slice(1);

    return monthAbbrCapitalized;
  }

  getDate(dateString: string): number{

    let date = new Date(dateString)
    return date.getDate()
  }

}
