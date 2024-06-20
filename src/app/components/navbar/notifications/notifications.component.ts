import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GroupNotificationComponent } from '../notification_types/group-notification/group-notification.component';
import {
  INotification,
  INotificationMessage,
} from '../../../models/notification';
import {NgbDropdownModule, NgbCollapse, NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from '../../../services/notifications.service';
import {GenericComponent} from "../notification_types/generic/generic.component";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [GroupNotificationComponent, NgbDropdownModule, NgbCollapse, GenericComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
  providers: [NgbDropdownConfig],
})
export class NotificationsComponent {
  @Input() notifications: INotification[] = [];
  @Input() notRead: number = 0;
  @Output() messageEvent = new EventEmitter<string>();

  constructor(private notificationService: NotificationsService,config: NgbDropdownConfig) {
    config.autoClose = false;
    config.placement = 'auto';
  }
  notificationResponse(event: INotificationMessage) {
    if (event.Accepted) {
      this.notificationService.accept(event.Id).subscribe((data) => {
        this.messageEvent.emit('reload');
      });
    } else {
      this.notificationService.decline(event.Id).subscribe((data) => {
        this.messageEvent.emit('reload');
      });
    }
  }

  delete(id: any){
    this.notificationService.deleteOne(id).subscribe((data) => {
    })
    this.notifications = this.notifications.filter(not => not.Id != id)
  }
  deleteAll(){
    this.notificationService.deleteRead().subscribe((data) => {
      this.messageEvent.emit('reload');
    })
  }
  reloadNotifications(){
    this.messageEvent.emit('reload');
  }
}
