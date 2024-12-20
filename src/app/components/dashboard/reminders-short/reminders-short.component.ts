import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IListResponse } from '../../../models/list';
import { MiniUserComponent } from '../../utils/mini-user/mini-user.component';
import {IItemResponse} from "../../../models/item";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-reminders-short',
  standalone: true,
  templateUrl: './reminders-short.component.html',
  styleUrl: './reminders-short.component.css',
  imports: [MiniUserComponent, ReactiveFormsModule, FormsModule],
})
export class RemindersShortComponent implements OnInit{
  @Input() list: IListResponse = {} as IListResponse;
  @Output() messageEvent = new EventEmitter<any>();
  nameFilter: string = ""
  todayFilter: boolean = false;
  noItems: boolean = false;
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
    this.filterItems()
  }

  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedItems = this.filteredItems.slice(startIndex, endIndex);
    if(this.pagedItems.length == 0){
    this.currentPage = 0;
    }
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

  isToday(dateString: string): boolean {
    const date = new Date(dateString);
    const today = new Date();

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  filterItems() {
    this.filteredItems = this.list.Items.filter(item => {
      return (this.nameFilter == "" || item.Name.toLowerCase().includes(this.nameFilter.toLowerCase())) &&
        (!this.todayFilter || (this.isToday(item.LimitDate)))
    }).sort((a, b) => {
      return new Date(b.LimitDate).getTime() - new Date(a.LimitDate).getTime();
    });
    console.log(this.filteredItems)
    this.totalPages = Math.ceil(this.filteredItems.length / this.pageSize);
    this.setPage(1)
  }
  cleanFilters(){
    this.nameFilter = ""
    this.todayFilter = false
    this.filterItems()
    this.totalPages = Math.ceil(this.filteredItems.length / this.pageSize);
    this.setPage(1)
  }
  showFilters(){
    this.filtersVisible = !this.filtersVisible
  }

  getShortDate(dateString: string): string {
    const date = new Date(dateString);
    const monthAbbr = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const dayOfMonth = date.getDate();
    const monthAbbrCapitalized = monthAbbr.charAt(0).toUpperCase() + monthAbbr.slice(1);

    return `${monthAbbrCapitalized} ${dayOfMonth}`;
  }

  getTime(dateString: string): string {
    const date = new Date(dateString);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${formattedHours}:${formattedMinutes}`;
  }

  formatDateToExcel(isoString: string): string {
    const date = new Date(isoString);

    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();

    return `${hours}:${minutes} ${day}-${month}-${year}`;
  }
  downloadExcel() {
    let list: any[] = []

    for (let item of this.list.Items) {
      list.push({"Titulo": item.Name,"Descripcion": item.Desc,"Fecha": this.formatDateToExcel(item.LimitDate.toString()),"Creador": item.CreatedBy.Name})
    }

    this.messageEvent.emit({list:list, name: this.list.Name});
  }
}
