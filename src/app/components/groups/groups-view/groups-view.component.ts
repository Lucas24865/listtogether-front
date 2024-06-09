import {Component} from '@angular/core';
import {IGroup} from '../../../models/group';
import {GroupComponent} from '../group/group.component';
import {GroupsService} from '../../../services/groups.service';
import {FormsModule} from "@angular/forms";
import {IUser} from "../../../models/user";

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
    service.getGroups().subscribe((data) => {
      this.groups = data.msg
      this.groupsFiltered = [...this.groups];
    })
  }

  filterList() {
    let lowerCaseSearchTerm = this.searchTerm.toLowerCase()
    this.groupsFiltered = this.groups.filter(group =>
      group.Name.toLowerCase().includes(lowerCaseSearchTerm))
  }
}
