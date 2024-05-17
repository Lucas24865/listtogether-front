import { Component, Input } from '@angular/core';
import { MiniUserComponent } from "../../utils/mini-user/mini-user.component";
import { FormatMoney } from "../../utils/pipes/formatMoney";
import { IListResponse } from '../../../models/list';

@Component({
    selector: 'app-accounts-short',
    standalone: true,
    templateUrl: './accounts-short.component.html',
    styleUrl: './accounts-short.component.css',
    imports: [MiniUserComponent, FormatMoney]
})
export class AccountsShortComponent{
  @Input() list: IListResponse = {} as IListResponse;
}
