import { Component, Input } from '@angular/core';
import { IListResponse } from '../../../models/list';
import { MiniUserComponent } from '../../utils/mini-user/mini-user.component';

@Component({
  selector: 'app-reminders-short',
  standalone: true,
  templateUrl: './reminders-short.component.html',
  styleUrl: './reminders-short.component.css',
  imports: [MiniUserComponent],
})
export class RemindersShortComponent {
  @Input() list: IListResponse = {} as IListResponse;

  getShortDate(dateString: string): string {
    const date = new Date(dateString);
    const monthAbbr = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const dayOfMonth = date.getDate();
    const monthAbbrCapitalized = monthAbbr.charAt(0).toUpperCase() + monthAbbr.slice(1);

    return `${monthAbbrCapitalized} ${dayOfMonth}`;
  }

  getTime(dateString: string): string {
    const date = new Date(dateString);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${formattedHours}:${formattedMinutes}`;
  }
}
