import {Component} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import Swal from 'sweetalert2';
import {GroupsService} from '../../../services/groups.service';
import {IGroupRequest} from '../../../models/groupRequest';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group-add',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css',
})
export class UserAddComponent {
  name: string | undefined;
  desc: string | undefined;
  userInput: string = '';
  users: string[] = [];

  constructor(private service: GroupsService, private router: Router) {
  }

  addUser() {
    this.users.push(this.userInput);
    this.userInput = '';
  }

  removeUser(userToRemove: string) {
    const index = this.users.indexOf(userToRemove);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  register() {
    let group: IGroupRequest = {
      Name: this.name!,
      Desc: this.desc!,
      Users: this.users,
      Admins: [],
      Id: "",
    }

    this.service.addGroup(group).subscribe((data) => {
      if (data.msg == "success") {
        Swal.fire({
          title: 'Exito!',
          text: 'El grupo se creo correctamente, se mandaron las solicitudes',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/groups']);
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Intente más tarde',
          icon: 'error',
        });
      }
    })
  }
}
