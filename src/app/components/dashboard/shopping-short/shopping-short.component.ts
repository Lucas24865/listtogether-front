import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IListResponse } from '../../../models/list';
import { MiniUserComponent } from "../../utils/mini-user/mini-user.component";
import {IItemResponse} from "../../../models/item";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-shopping-short',
    standalone: true,
    templateUrl: './shopping-short.component.html',
    styleUrl: './shopping-short.component.css',
  imports: [MiniUserComponent, FormsModule]
})
export class ShoppingShortComponent implements OnInit{
  @Input() list: IListResponse = {} as IListResponse;
  @Output() messageEvent = new EventEmitter<any>();
  nameFilter: string = ""
  completeFilter: boolean = false;
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

  filterItems() {
    this.filteredItems = this.list.Items.filter(item => {
      return (this.nameFilter == "" || item.Name.toLowerCase().includes(this.nameFilter.toLowerCase())) &&
        (!this.completeFilter || (this.completeFilter && !item.Completed))
    });
    this.totalPages = Math.ceil(this.filteredItems.length / this.pageSize);
    this.setPage(1)
  }
  cleanFilters(){
    this.nameFilter = ""
    this.completeFilter = false
    this.filterItems()
    this.totalPages = Math.ceil(this.filteredItems.length / this.pageSize);
    this.setPage(1)
  }
  showFilters(){
    this.filtersVisible = !this.filtersVisible
  }

  downloadExcel() {
    let list: any[] = []

    for (let item of this.list.Items) {
      list.push({"Titulo": item.Name,"Descripcion": item.Desc,"Cantidad": item.Quantity,"Creador": item.CreatedBy.Name, "Completo?": item.Completed? "Si" : "No","Completado por": item.CompletedBy.Name})
    }

    this.messageEvent.emit({list:list, name: this.list.Name});
  }
}
