import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IListResponse } from '../../../models/list';
import { MiniUserComponent } from "../../utils/mini-user/mini-user.component";
import {INotificationMessage} from "../../../models/notification";
import {IItemResponse} from "../../../models/item";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-notes-short',
    standalone: true,
    templateUrl: './notes-short.component.html',
    styleUrl: './notes-short.component.css',
  imports: [MiniUserComponent, ReactiveFormsModule, FormsModule]
})
export class NotesShortComponent implements OnInit{
  @Input() list: IListResponse = {} as IListResponse;
  @Output() messageEvent = new EventEmitter<any>();
  nameFilter: string = ""
  filteredItems:IItemResponse[] = []
  pagedItems: IItemResponse[] = []
  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 1;
  filtersVisible: boolean = false;

  ngOnInit() {
    this.filteredItems =  [...this.list.Items]
    this.totalPages = Math.ceil(this.filteredItems.length / this.pageSize);
    this.setPage(this.currentPage);
  }

  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedItems = this.filteredItems.slice(startIndex, endIndex);
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

  filterItems() {
    this.filteredItems = this.list.Items.filter(item => {
      return (this.nameFilter == "" || item.Name.toLowerCase().includes(this.nameFilter.toLowerCase()))
    });
    this.totalPages = Math.ceil(this.filteredItems.length / this.pageSize);
    this.setPage(1)
  }
  cleanFilters(){
    this.nameFilter = ""
    this.filterItems()
    this.totalPages = Math.ceil(this.filteredItems.length / this.pageSize);
    this.setPage(1)
  }
  showFilters(){
    this.filtersVisible = !this.filtersVisible
  }

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

  downloadExcel() {
    let list: any[] = []

    for (let item of this.list.Items) {
      list.push({"Titulo": item.Name,"Descripcion": item.Desc,"Fecha de creacion": item.CreatedAt,"Creador": item.CreatedBy.Name})
    }

    this.messageEvent.emit({list:list, name: this.list.Name});
  }
}
