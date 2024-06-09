import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: string | undefined;
  pass: string | undefined;

  constructor(private AuthService: AuthService, private router: Router) {}

  login() {
    this.AuthService.Login({ user: this.user, pass: this.pass }).subscribe(
      (data) => {
        sessionStorage.setItem('userToken', data.Token);
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.log(error)
        if (error.error.error == "invalid pass" || error.error.error == "invalid user or email"){
          Swal.fire({
            title: 'Error!',
            text: 'Usuario o contraseña incorrecto',
            icon: 'error',
          });
          return;
        }
        if (error.status == 0){
          Swal.fire({
            title: 'Error!',
            text: 'No se puede conectar con el servidor',
            icon: 'error',
          });
        }
      }
    );
  }
}
