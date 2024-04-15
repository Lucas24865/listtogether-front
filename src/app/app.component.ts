import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GroupViewComponent } from './components/dashboard/group-view/group-view.component';
import { TypeViewComponent } from './components/dashboard/type-view/type-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, CommonModule, NavbarComponent, GroupViewComponent, TypeViewComponent],
})
export class AppComponent {
  title = 'list-together';
  constructor(private router: Router) {}
  isActiveLogin(): boolean {
    return this.router.url === '/login' || this.router.url === '/register' || this.router.url === '/forgot';
  }
}
