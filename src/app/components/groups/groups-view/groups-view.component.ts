import { Component } from '@angular/core';
import { IGroup } from '../../../models/group';
import { GroupComponent } from '../group/group.component';
import { GroupsService } from '../../../services/groups.service';
import Swal from "sweetalert2";

@Component({
    selector: 'app-groups-view',
    standalone: true,
    templateUrl: './groups-view.component.html',
    styleUrl: './groups-view.component.css',
    imports: [GroupComponent]
})
export class GroupsViewComponent {
  groups: IGroup[] = []
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
      console.log(data)
      this.groups = data.msg
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
}
