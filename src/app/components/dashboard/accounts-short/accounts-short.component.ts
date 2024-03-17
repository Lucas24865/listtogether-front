import { Component } from '@angular/core';
import { IDashItem } from '../../../models/dash-item';
import { MiniUserComponent } from "../../utils/mini-user/mini-user.component";
import { FormatMoney } from "../../utils/pipes/formatMoney";

@Component({
    selector: 'app-accounts-short',
    standalone: true,
    templateUrl: './accounts-short.component.html',
    styleUrl: './accounts-short.component.css',
    imports: [MiniUserComponent, FormatMoney]
})
export class AccountsShortComponent {
  pendingAccounts: IDashItem[] = [
    {
      date: new Date(),
      added: new Date(),
      title: 'Luz',
      desc: 'Factura de luz del mes',
      users: [
      ],
      addedBy: {
        picture: '',
        name: 'Admin',
        color: 'blue',
        doubleSize: false,
      },
      total: 15000,
      got: 0,
    },
    {
      date: new Date(),
      added: new Date(),
      title: 'Internet',
      desc: 'Factura de internet del mes',
      users: [
        {
          picture: '',
          name: 'Lucas',
          color: 'blue',
          doubleSize: false,
        }
      ],
      addedBy: {
        picture: '',
        name: 'Admin',
        color: 'blue',
        doubleSize: false,
      },
      total: 10000,
      got: 5000,
    }
  ];
}
