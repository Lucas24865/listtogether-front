import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MiniUserComponent } from '../../utils/mini-user/mini-user.component';
import { IListResponse } from '../../../models/list';
import {IItemResponse} from "../../../models/item";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-events-short',
  standalone: true,
  templateUrl: './events-short.component.html',
  styleUrl: './events-short.component.css',
  imports: [MiniUserComponent, ReactiveFormsModule, FormsModule],
})
export class EventsShortComponent implements OnInit{
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

  getShortMonth(dateString: string): string{
    const date = new Date(dateString);
    const monthAbbr = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const monthAbbrCapitalized = monthAbbr.charAt(0).toUpperCase() + monthAbbr.slice(1);

    return monthAbbrCapitalized;
  }

  getDate(dateString: string): number{

    let date = new Date(dateString)
    return date.getDate()
  }

  downloadExcel() {
    let list: any[] = []

    for (let item of this.list.Items) {
      list.push({"Titulo": item.Name,"Descripcion": item.Desc,"Fecha": this.formatDateToExcel(item.LimitDate), "Creador": item.CreatedBy.Name})
    }

    this.messageEvent.emit({list:list, name: this.list.Name});
  }

  formatDateToExcel(isoString: string): string {
    const date = new Date(isoString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();

    return `${day}-${month}-${year}`;
  }
}
