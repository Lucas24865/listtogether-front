import {Component} from '@angular/core';
import {UserComponent} from '../user/user.component';
import {IUser} from "../../../models/user";
import {UsersService} from "../../../services/users.service";
import {FormsModule} from "@angular/forms";
import Swal from "sweetalert2";

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
  nameFilter: string = '';

  constructor(private service: UsersService) {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espere',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    service.getUsers().subscribe((data) => {
      this.users = data.msg
      this.usersFiltered = [...this.users];
      Swal.close();
    }, (error) => {
      console.error(error);
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al cargar los datos',
      });
    });
  }

  cleanFilters() {
    this.nameFilter = ""
    this.filterList()
  }

  filterList() {
    let lowerCaseSearchTerm = this.nameFilter.toLowerCase()
    this.usersFiltered = this.users.filter(user =>
      user.User.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.Name.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.Mail.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
}
