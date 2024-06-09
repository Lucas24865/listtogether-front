import {Component} from '@angular/core';
import {UserComponent} from '../user/user.component';
import {IUser} from "../../../models/user";
import {UsersService} from "../../../services/users.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-groups-view',
  standalone: true,
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
  imports: [UserComponent, FormsModule]
})
export class UserViewComponent {
  users: IUser[] = []
  usersFiltered: IUser[] = []
  searchTerm: string = '';

  constructor(private service: UsersService) {
    service.getUsers().subscribe((data) => {
      this.users = data.msg
      this.usersFiltered = [...this.users];
    })
  }

  filterList() {
    let lowerCaseSearchTerm = this.searchTerm.toLowerCase()
    this.usersFiltered = this.users.filter(user =>
      user.User.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.Name.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.Mail.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
}
