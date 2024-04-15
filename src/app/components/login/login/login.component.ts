import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user: string | undefined ;
  pass: string | undefined;

  constructor(private AuthService: AuthService, private router: Router){}

  login(){
    this.AuthService.Login({user: this.user, pass: this.pass}).subscribe(
      data => {
      sessionStorage.setItem('userToken', data.Token);
      this.router.navigateByUrl('/');
    })
  }

}
