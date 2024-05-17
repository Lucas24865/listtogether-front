import { Component, Input } from '@angular/core';
import { IListResponse } from '../../../models/list';
import { MiniUserComponent } from "../../utils/mini-user/mini-user.component";

@Component({
    selector: 'app-shopping-short',
    standalone: true,
    templateUrl: './shopping-short.component.html',
    styleUrl: './shopping-short.component.css',
    imports: [MiniUserComponent]
})
export class ShoppingShortComponent {
  @Input() list: IListResponse = {} as IListResponse;


}
