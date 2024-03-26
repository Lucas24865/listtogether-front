import { Component, Input } from '@angular/core';
import { IList } from '../../../models/list';

@Component({
  selector: 'app-notes-short',
  standalone: true,
  imports: [],
  templateUrl: './notes-short.component.html',
  styleUrl: './notes-short.component.css'
})
export class NotesShortComponent {
  @Input() list: IList = {} as IList;
}
