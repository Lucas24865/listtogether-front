import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {IUser, IUserRequest} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import swal from "sweetalert2";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class UserEditComponent implements OnInit{
  userRequest: IUserRequest = {} as IUserRequest
  user: IUser = {} as IUser
  pass: string = ""
  passConf: string = ""
  OldPass: string = ""
  passErrorLength: boolean = false
  passErrorUpper: boolean = false
  passErrorNumber: boolean = false
  passConfError: boolean = false
  sendEnabled: boolean = true

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user')!).msg as IUser;
  }

  checkPassConf(){
    if (this.passConf == "" && this.pass == ""){
      this.sendEnabled = true
      return
    }
    if (this.passErrorLength || this.passErrorUpper || this.passErrorNumber) {
      this.sendEnabled = false
      return
    }
    if (this.passConf == this.pass) {
      this.passConfError = false
      this.sendEnabled = true
    } else {
      this.passConfError = true
      this.sendEnabled = false
    }
  }

  checkPass(){
    this.passErrorLength = this.pass.length < 8;
    this.passErrorUpper = !/[A-Z]/.test(this.pass);
    this.passErrorNumber = !/\d/.test(this.pass);
    if (this.passErrorLength || this.passErrorLength || this.passErrorLength) {
      this.sendEnabled = false
    }
    this.checkPassConf()
  }

  update(){
    if (!this.sendEnabled){
      return
    }

    this.userRequest.OldPass = this.OldPass
    this.userRequest.Name = this.user.Name
    this.userRequest.NewPass = this.passConf
    this.userRequest.Color = this.user.Color
    this.userRequest.User = this.user.User

    this.userService.Update(this.userRequest).subscribe(data => {
      swal.fire({
            icon: "success",
            title: "Cambios guardados!",
            footer: 'Por favor inicie sesión nuevamente'})
          .then(() => {
            this.router.navigateByUrl('/login');
      })
    },
        (error) => {
          console.log(error)
          if (error.error.error == "invalid pass") {
            Swal.fire({
              title: 'Error!',
              text: 'Contraseña incorrecta',
              icon: 'error',
            });
            return;
          }
        }

    )

  }
}