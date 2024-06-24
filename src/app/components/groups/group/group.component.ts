import {Component, Input, OnInit} from '@angular/core';
import { IGroup } from '../../../models/group';
import { MiniUserComponent } from "../../utils/mini-user/mini-user.component";
import {IUser} from "../../../models/user";

@Component({
    selector: 'app-group',
    standalone: true,
    templateUrl: './group.component.html',
    styleUrl: './group.component.css',
    imports: [MiniUserComponent]
})
export class GroupComponent implements OnInit{
  @Input() group: IGroup = {} as IGroup;
  isAdmin: boolean = false;

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem('user')!).msg as IUser;
    for (let admin of this.group.Admins) {
      if(admin.User === user.User){
        this.isAdmin = true;
      }
    }
  }


}
