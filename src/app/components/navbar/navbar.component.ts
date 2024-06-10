import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MiniUserComponent } from '../utils/mini-user/mini-user.component';
import { IUser } from '../../models/user';
import { NgbDropdownModule, NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { INotification } from '../../models/notification';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [
    CommonModule,
    MiniUserComponent,
    NgbDropdownModule,
    NgbCollapse,
  ],
})
export class NavbarComponent implements OnInit {
  public isCollapsed: boolean = true;
  currentRoute: string | null = null;
  user: IUser = {} as IUser;
  notifications: INotification[] = [];
  constructor(
    private router: Router,
    private authService: AuthService,
    private elementRef: ElementRef,
  ) {}

  ngOnInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.user = JSON.parse(sessionStorage.getItem('user')!).msg as IUser;
        }
      });
    });

    observer.observe(this.elementRef.nativeElement);
  }


  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
  logout() {
    this.authService.Logout();
    this.router.navigateByUrl('/login');
  }
}
