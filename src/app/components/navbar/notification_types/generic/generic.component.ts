import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbDropdownItem} from "@ng-bootstrap/ng-bootstrap";
import {INotification, INotificationMessage} from "../../../../models/notification";
import {CapitalizeFirstLetterPipe} from "../../../utils/pipes/capitalize-first-letter.pipe";

@Component({
  selector: 'app-generic',
  standalone: true,
  imports: [
    NgbDropdownItem,
    CapitalizeFirstLetterPipe
  ],
  templateUrl: './generic.component.html',
  styleUrl: './generic.component.css'
})
export class GenericComponent {
  @Input() notification: INotification = {} as INotification;
  @Output() messageEvent = new EventEmitter<string>();

  read() {}
  delete(){
    this.messageEvent.emit(this.notification.Id );
  }
}
