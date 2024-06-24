import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { GroupsService } from '../../../services/groups.service';
import { IGroupRequest } from '../../../models/groupRequest';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-group-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './group-edit.component.html',
  styleUrl: './group-edit.component.css',
})
export class GroupEditComponent {
  userInput: string = '';
  group: IGroupRequest = {} as IGroupRequest;

  constructor(
    private service: GroupsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.service.getGroup(params['id']).subscribe((data) => {
        this.group = data.msg;
      });
    });
  }

  addUser() {
    if (this.userInput != ''){
      this.group.Users.push(this.userInput);
      this.userInput = '';
    }
  }

  removeUser(userToRemove: string) {
    const index = this.group.Users.indexOf(userToRemove);
    if (index !== -1) {
      this.group.Users.splice(index, 1);
    }
  }

  register() {
    this.service.editGroup(this.group).subscribe((data) => {
      if (data.msg == 'success') {
        Swal.fire({
          title: 'Exito!',
          text: 'El grupo se edito correctamente!',
          footer: 'Si agregó usuarios se enviaron las solicitudes',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/groups']);
        });
      } else {
        console.log(data);
        Swal.fire({
          title: 'Error!',
          text: 'Intente más tarde',
          icon: 'error',
        });
      }
    });
  }
}
