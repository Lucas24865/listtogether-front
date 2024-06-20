import {Component} from '@angular/core';
import {UserComponent} from '../user/user.component';
import {IUser} from "../../../models/user";
import {UsersService} from "../../../services/users.service";
import {FormsModule} from "@angular/forms";
import Swal from "sweetalert2";
import {IGroup} from "../../../models/group";

@Component({
    selector: 'app-groups-view',
    standalone: true,
    templateUrl: './user-view.component.html',
    styleUrl: './user-view.component.css',
    imports: [UserComponent, FormsModule]
})
export class UserViewComponent {
    users: IUser[] = []
    usersFiltered: IUser[] = []
    nameFilter: string = '';
    pagedUsers: IUser[] = []
    currentPage: number = 1;
    pageSize: number = 14;
    totalPages: number = 1;

    constructor(private service: UsersService) {
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espere',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        service.getUsers().subscribe((data) => {
            this.users = data.msg
            this.usersFiltered = [...this.users];
            this.totalPages = Math.ceil(this.usersFiltered.length / this.pageSize);
            this.setPage(this.currentPage);
            Swal.close();
        }, (error) => {
            console.error(error);
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al cargar los datos',
            });
        });
    }

    setPage(page: number) {
        this.currentPage = page;
        const startIndex = (page - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.pagedUsers = this.usersFiltered.slice(startIndex, endIndex);
    }

    cleanFilters() {
        this.nameFilter = ""
        this.filterList()
        this.totalPages = Math.ceil(this.usersFiltered.length / this.pageSize);
        this.setPage(1)
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.setPage(this.currentPage - 1);
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.setPage(this.currentPage + 1);
        }
    }

    filterList() {
        let lowerCaseSearchTerm = this.nameFilter.toLowerCase()
        this.usersFiltered = this.users.filter(user =>
            user.User.toLowerCase().includes(lowerCaseSearchTerm) ||
            user.Name.toLowerCase().includes(lowerCaseSearchTerm) ||
            user.Mail.toLowerCase().includes(lowerCaseSearchTerm)
        );
        this.totalPages = Math.ceil(this.usersFiltered.length / this.pageSize);
        this.setPage(1)
    }
}
