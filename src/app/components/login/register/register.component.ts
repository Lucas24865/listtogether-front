import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  user: string | undefined;
  mail: string | undefined;
  fullName: string | undefined;
  pass: string | undefined;
  passConf: string | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.pass != this.passConf) {
        swal.fire({
          title: 'Error!',
          text: 'Las contraseñas no son iguales',
          icon: 'error',
        });
      return;
    }

    this.authService
      .Register({ user: this.user, pass: this.pass, mail: this.mail, name: this.fullName })
      .subscribe(
        () => {
          swal.fire({
            title: 'Éxito!',
            text: 'Se creó correctamente el usuario, por favor inicie sesión',
            icon: 'success',
          }).then(() => {this.router.navigateByUrl('/');});
        },
        (error) => {
          if(error.error.error == 'mail is already registered'){
            swal.fire({
              title: 'Error!',
              text: 'El mail se encuentra registrado, intente iniciar sesión',
              icon: 'error',
            });
          }
          if(error.error.error == 'user is already registered'){
            swal.fire({
              title: 'Error!',
              text: 'El usuario se encuentra registrado, intente iniciar sesión o un intente uno distinto',
              icon: 'error',
            });
          }
        }
      );
  }
}
