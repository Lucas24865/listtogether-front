import { Component } from '@angular/core';
import { GroupNotificationComponent } from '../notification_types/group-notification/group-notification.component';
import { IGroupNotification } from '../../../models/groupNotification';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [GroupNotificationComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications: IGroupNotification[] = []
}
