import {Component, Input, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {IUser} from "../../../models/user";
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{
  @Input() user: IUser = {} as IUser
  pass: string = ""
  passConf: string = ""

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user')!).msg as IUser;
  }

  update(){

  }
}
