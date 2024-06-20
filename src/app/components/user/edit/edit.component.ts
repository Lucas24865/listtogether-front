import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {IUser} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import swal from "sweetalert2";
import {Router} from "@angular/router";

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
  user: IUser = {} as IUser
  pass: string = ""
  passConf: string = ""
  passErrorLength: boolean = false
  passErrorUpper: boolean = false
  passErrorNumber: boolean = false
  passConfError: boolean = false
  sendEnabled: boolean = false

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user')!).msg as IUser;
  }

  checkPassConf(){
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

  }

  update(){
    if (!this.sendEnabled){
      return
    }
    this.user.Pass = this.passConf
    console.log(this.user)
    this.userService.Update(this.user).subscribe(data => {
      swal.fire({
            icon: "success",
            title: "Cambios guardados!",
            footer: 'Por favor inicie sesión nuevamente'})
          .then(() => {
            this.router.navigateByUrl('/login');
      })
    })

  }
}