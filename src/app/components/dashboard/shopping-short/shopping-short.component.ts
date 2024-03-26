import { Component, Input } from '@angular/core';
import { IList } from '../../../models/list';

@Component({
  selector: 'app-shopping-short',
  standalone: true,
  imports: [],
  templateUrl: './shopping-short.component.html',
  styleUrl: './shopping-short.component.css'
})
export class ShoppingShortComponent {
  @Input() list: IList = {} as IList;


}
