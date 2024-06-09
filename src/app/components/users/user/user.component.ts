import {Component, Input} from '@angular/core';
import {MiniUserComponent} from "../../utils/mini-user/mini-user.component";
import {IUser} from "../../../models/user";

@Component({
  selector: 'app-group',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [MiniUserComponent]
})
export class UserComponent {
  @Input() user: IUser = {} as IUser;

}
