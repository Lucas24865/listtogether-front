import {Component} from '@angular/core';
import {IGroup} from '../../../models/group';
import {GroupComponent} from '../group/group.component';
import {GroupsService} from '../../../services/groups.service';
import {FormsModule} from "@angular/forms";
import {IUser} from "../../../models/user";
import Swal from "sweetalert2";

@Component({
  selector: 'app-groups-view',
  standalone: true,
  templateUrl: './groups-view.component.html',
  styleUrl: './groups-view.component.css',
  imports: [GroupComponent, FormsModule]
})
export class GroupsViewComponent {
  groups: IGroup[] = []
  groupsFiltered: IGroup[] = []
  searchTerm: string = '';

  constructor(private service: GroupsService) {
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
      this.groupsFiltered = [...this.groups];
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

  cleanFilters() {
    this.searchTerm = ""
    this.filterList()
  }
  filterList() {
    let lowerCaseSearchTerm = this.searchTerm.toLowerCase()
    this.groupsFiltered = this.groups.filter(group =>
      group.Name.toLowerCase().includes(lowerCaseSearchTerm) || group.Desc.toLowerCase().includes(lowerCaseSearchTerm))
  }
}
