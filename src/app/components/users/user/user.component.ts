import {Component, Input} from '@angular/core';
import {MiniUserComponent} from "../../utils/mini-user/mini-user.component";
import {IUser} from "../../../models/user";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-group',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
    imports: [MiniUserComponent, FormsModule]
})
export class UserComponent {
    @Input() user: IUser = {} as IUser;

    transformDate(date: string): string {
        if (date != "") {
            const limitDate = new Date(date);

            const year = limitDate.getFullYear();
            const month = String(limitDate.getMonth() + 1).padStart(2, '0'); // Mes comienza desde 0
            const day = String(limitDate.getDate()).padStart(2, '0');
            const hours = String(limitDate.getHours()).padStart(2, '0');
            const minutes = String(limitDate.getMinutes()).padStart(2, '0');

            return `${year}-${month}-${day}T${hours}:${minutes}`;
        }
        return ""
    }
}
