import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './group-edit.component.html',
  styleUrl: './group-edit.component.css'
})
export class GroupEditComponent {

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
