import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './group-add.component.html',
  styleUrl: './group-add.component.css'
})
export class GroupAddComponent {

  user: string | undefined;
  mail: string | undefined;
  fullName: string | undefined;
  pass: string | undefined;
  passConf: string | undefined;

  register() {
    if (this.pass != this.passConf) {
        Swal.fire({
          title: 'Error!',
          text: 'Las contraseñas no son iguales',
          icon: 'error',
        });
      return;
    }
  }
}
