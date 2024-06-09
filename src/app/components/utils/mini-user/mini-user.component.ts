import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../../models/user';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mini-user',
  standalone: true,
  imports: [NgbModule, CommonModule],
  templateUrl: './mini-user.component.html',
  styleUrl: './mini-user.component.css',
})
export class MiniUserComponent {
  @Input() users: IUser[] = [];
  @Input() doubleSized: boolean = false;
  @Input() labeled: boolean = true;
}
