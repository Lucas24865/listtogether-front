import { Component } from '@angular/core';
import { IGroup } from '../../../models/group';
import { GroupComponent } from '../group/group.component';
import { GroupsService } from '../../../services/groups.service';

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
    service.getGroups().subscribe((data) => {
      this.groups = data.msg
      console.log(data)
    })
  }
}
