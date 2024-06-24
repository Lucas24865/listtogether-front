import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { GroupsService } from '../../../services/groups.service';
import { IGroupRequest } from '../../../models/groupRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-add',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './group-add.component.html',
  styleUrl: './group-add.component.css',
})
export class GroupAddComponent {
  name: string | undefined;
  desc: string | undefined;
  userInput: string = '';
  users: string[] = [];

  constructor(private service: GroupsService, private router: Router) {}

  addUser() {
    if (this.userInput != ''){
      this.users.push(this.userInput);
      this.userInput = '';
    }
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
        }).then(() => {this.router.navigate(['/groups']);});
      }
      else{
        Swal.fire({
          title: 'Error!',
          text: 'Intente más tarde',
          icon: 'error',
        });
      }
    })
  }
}
