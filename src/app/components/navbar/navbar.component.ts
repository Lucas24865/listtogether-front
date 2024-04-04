import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MiniUserComponent } from "../utils/mini-user/mini-user.component";
import { IUserShort } from '../../models/users-shorts';
import { NgbDropdownModule, NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [CommonModule, MiniUserComponent, NgbDropdownModule, NgbCollapse]
})
export class NavbarComponent {
  public isCollapsed : boolean = true;
  currentRoute: string | null = null
  user: IUserShort = {} as IUserShort;
  constructor(private router: Router) {
    this.user = {
      picture: '',
      name: 'Lucas',
      color: 'black',
    } as IUserShort;
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
  isActiveLogin(): boolean {
    return this.router.url === '/login' || this.router.url === '/register' || this.router.url === '/forgot';
  }
}
