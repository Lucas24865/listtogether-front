import { Component } from '@angular/core';
import { IGroup } from '../../../models/group';
import { GroupComponent } from '../group/group.component';
import { GroupsService } from '../../../services/groups.service';
import Swal from "sweetalert2";
import {FormsModule} from "@angular/forms";
import {IItemResponse} from "../../../models/item";

@Component({
    selector: 'app-groups-view',
    standalone: true,
    templateUrl: './groups-view.component.html',
    styleUrl: './groups-view.component.css',
  imports: [GroupComponent, FormsModule]
})
export class GroupsViewComponent {
  groups: IGroup[] = []
  filteredGroups: IGroup[] = []
  nameFilter: string = ""
  pagedGroups: IGroup[] = []
  currentPage: number = 1;
  pageSize: number = 14;
  totalPages: number = 1;
  constructor (private service: GroupsService){
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espere',
      allowOutsideClick: false,
      didOpen: () => {
        // @ts-ignore
        Swal.showLoading();
      }
    });
    service.getGroups().subscribe((data) => {
      this.groups = data.msg
      this.filteredGroups = [...this.groups]
      this.totalPages = Math.ceil(this.filteredGroups.length / this.pageSize);
      this.setPage(this.currentPage);
      Swal.close();
    }, (error) => {
      console.error(error);
      // Manejar el error y cerrar el spinner de carga
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
    this.pagedGroups = this.filteredGroups.slice(startIndex, endIndex);
  }
  filterGroups() {
    this.filteredGroups = this.groups.filter(group => {
      return (this.nameFilter == "" || group.Name.toLowerCase().includes(this.nameFilter.toLowerCase()))
    });
    this.totalPages = Math.ceil(this.filteredGroups.length / this.pageSize);
    this.setPage(1)
  }
  cleanFilters(){
    this.nameFilter = ""
    this.filterGroups()
    this.totalPages = Math.ceil(this.filteredGroups.length / this.pageSize);
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
}
