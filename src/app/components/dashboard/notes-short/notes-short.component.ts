import { Component, Input } from '@angular/core';
import { IListResponse } from '../../../models/list';
import { MiniUserComponent } from "../../utils/mini-user/mini-user.component";

@Component({
    selector: 'app-notes-short',
    standalone: true,
    templateUrl: './notes-short.component.html',
    styleUrl: './notes-short.component.css',
    imports: [MiniUserComponent]
})
export class NotesShortComponent {
  @Input() list: IListResponse = {} as IListResponse;

  getDifference(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    const differenceInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (differenceInSeconds < 60) {
        return 'hace menos de un minuto';
    } else if (differenceInSeconds < 3600) {
        const minutes = Math.floor(differenceInSeconds / 60);
        return `hace ${minutes} minutos`;
    } else if (differenceInSeconds < 86400) {
        const hours = Math.floor(differenceInSeconds / 3600);
        return `hace ${hours} horas`;
    } else {
        const days = Math.floor(differenceInSeconds / 86400);
        return `hace ${days} días`;
    }
}
}
