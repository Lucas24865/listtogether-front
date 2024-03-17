import { Component, Input  } from '@angular/core';
import { IUserShort } from '../../../models/users-shorts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mini-user',
  standalone: true,
  imports: [NgbModule, CommonModule],
  templateUrl: './mini-user.component.html',
  styleUrl: './mini-user.component.css'
})
export class MiniUserComponent {
  @Input() users: IUserShort[] = [];
}
