import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GroupNotificationComponent } from '../notification_types/group-notification/group-notification.component';
import {
  INotification,
  INotificationMessage,
} from '../../../models/notification';
import { NgbDropdownModule, NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from '../../../services/notifications.service';
import {GenericComponent} from "../notification_types/generic/generic.component";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [GroupNotificationComponent, NgbDropdownModule, NgbCollapse, GenericComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  @Input() notifications: INotification[] = [];
  @Output() messageEvent = new EventEmitter<string>();

  constructor(private notificationService: NotificationsService) {}

  notificationResponse(event: INotificationMessage) {
    if (event.Accepted) {
      this.notificationService.accept(event.Id).subscribe((data) => {
        console.log(data);
        this.messageEvent.emit('reload');
      });
    } else {
      this.notificationService.decline(event.Id).subscribe((data) => {
        console.log(data);
        this.messageEvent.emit('reload');
      });
    }
  }
}
