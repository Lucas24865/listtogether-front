import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  INotification,
  INotificationMessage,
} from '../../../../models/notification';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-group-notification',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './group-notification.component.html',
  styleUrl: './group-notification.component.css',
})
export class GroupNotificationComponent {
  @Input() notification: INotification = {} as INotification;
  @Output() messageEvent = new EventEmitter<INotificationMessage>();

  read() {}
  accept() {
    this.messageEvent.emit({ Accepted: true, Id: this.notification.Id });
  }
  decline() {
    this.messageEvent.emit({ Accepted: false, Id: this.notification.Id });
  }
  delete(){
    
  }
}
