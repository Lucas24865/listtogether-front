import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isViewGroup: boolean = false
  @Output() operationEvent = new EventEmitter<boolean>();

  changeView(){
    this.isViewGroup = !this.isViewGroup
    this.operationEvent.emit(this.isViewGroup);
  }

}
