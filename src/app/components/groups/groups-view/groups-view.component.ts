import { Component } from '@angular/core';
import { IGroup } from '../../../models/group';
import { GroupComponent } from '../group/group.component';
import { GroupsService } from '../../../services/groups.service';
import Swal from "sweetalert2";
import {FormsModule} from "@angular/forms";

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
  constructor (private service: GroupsService){
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espere',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    service.getGroups().subscribe((data) => {
      this.groups = data.msg
      this.filteredGroups = [...this.groups]
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
  filterGroups() {
    this.filteredGroups = this.groups.filter(group => {
      return (this.nameFilter == "" || group.Name.toLowerCase().includes(this.nameFilter.toLowerCase()))
    });
  }
  cleanFilters(){
    this.nameFilter = ""
  }
}
