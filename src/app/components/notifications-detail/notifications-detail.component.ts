import {Component, ElementRef, OnInit} from '@angular/core';
import {DatePipe, NgClass, CommonModule } from "@angular/common";
import {FormsModule} from "@angular/forms";
import {INotification} from "../../models/notification";
import {IGroup} from "../../models/group";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NotificationsService} from "../../services/notifications.service";

@Component({
  selector: 'app-notifications-detail',
  standalone: true,
  imports: [
    NgClass,
    CommonModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './notifications-detail.component.html',
  styleUrl: './notifications-detail.component.css'
})
export class NotificationsDetailComponent implements OnInit{
  notifications: INotification[] = [];
  pagedNotifications: INotification[] = []
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(
    private notifService: NotificationsService
  ) {}

  // Filtros
  filters = {
    message: '',
    group: '',
    user: '',
    lists: '',
  };

  // Propiedades para valores únicos (se llenarán dinámicamente)
  uniqueLists: string[] = [];
  uniqueGroups: string[] = [];
  uniqueUsers: string[] = [];

  // Lista filtrada
  get filteredNotifications() {
    return this.notifications.filter((n) => {
      return (
        (this.filters.message === '' || n.Message.toLowerCase().includes(this.filters.message.toLowerCase())) &&
        (this.filters.group === '' || n.Group === this.filters.group) &&
        (this.filters.user === '' || n.UserOwner === this.filters.user) &&
        (this.filters.lists === '' || n.ListName === this.filters.lists)
      );
    });
  }

  ngOnInit() {
    this.notifService.getAllWithDeleted().subscribe((data) => {
      this.notifications = data.msg;
      this.uniqueGroups = [...new Set(this.notifications.map((n) => n.Group).filter((group) => group))];
      this.uniqueUsers = [...new Set(this.notifications.map((n) => n.UserOwner).filter((user) => user))];
      this.uniqueLists = [...new Set(this.notifications.map((n) => n.ListName).filter((list) => list))];
      this.totalPages = Math.ceil(this.filteredNotifications.length / this.pageSize);
      this.setPage(this.currentPage);
    });
  }

  resetFilters() {
    this.filters = {
      message: '',
      group: '',
      user: '',
      lists: ''
    };
    this.setPage(1);
  }

  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedNotifications = this.filteredNotifications.slice(startIndex, endIndex);
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

  filter(){
    this.setPage(1);
  }
}
