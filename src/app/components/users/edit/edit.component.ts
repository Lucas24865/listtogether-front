import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {IUser} from "../../../models/user";

@Component({
    selector: 'app-edit',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
    user: IUser = {} as IUser
    pass: string = ""
    passConf: string = ""

    constructor() {
    }

    ngOnInit(): void {
        this.user = JSON.parse(sessionStorage.getItem('user')!).msg as IUser;
    }

    update() {

    }
}
