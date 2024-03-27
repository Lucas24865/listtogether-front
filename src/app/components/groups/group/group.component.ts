import { Component, Input  } from '@angular/core';
import { IGroup } from '../../../models/group';
import { MiniUserComponent } from "../../utils/mini-user/mini-user.component";

@Component({
    selector: 'app-group',
    standalone: true,
    templateUrl: './group.component.html',
    styleUrl: './group.component.css',
    imports: [MiniUserComponent]
})
export class GroupComponent {
  @Input() group: IGroup = {} as IGroup;

}
