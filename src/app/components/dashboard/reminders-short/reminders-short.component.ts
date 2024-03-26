import { Component, Input } from '@angular/core';
import { IList } from '../../../models/list';

@Component({
  selector: 'app-reminders-short',
  standalone: true,
  imports: [],
  templateUrl: './reminders-short.component.html',
  styleUrl: './reminders-short.component.css'
})
export class RemindersShortComponent {

  @Input() list: IList = {} as IList;

}
