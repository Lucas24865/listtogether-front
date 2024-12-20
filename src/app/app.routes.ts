import { Routes } from '@angular/router';
import { MainComponent } from './components/dashboard/main/main.component';
import { GroupsViewComponent } from './components/groups/groups-view/groups-view.component';
import { StatisticsViewComponent } from './components/statistics/statistics-view/statistics-view.component';
import { LoginComponent } from './components/login/login/login.component';
import { ForgotComponent } from './components/login/forgot/forgot.component';
import { RegisterComponent } from './components/login/register/register.component';
import { authGuard } from './guards/auth.guard';
import { GroupAddComponent } from './components/groups/group-add/group-add.component';
import { GroupEditComponent } from './components/groups/group-edit/group-edit.component';
import { CreateComponent } from './components/lists/create/create.component';
import { UserEditComponent } from './components/user/edit/edit.component';
import {EditComponent} from './components/lists/edit/edit.component';
import {HelpComponent} from "./components/help/help.component";
import {NotificationsDetailComponent} from "./components/notifications-detail/notifications-detail.component";

export const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [authGuard] },
  { path: 'groups', component: GroupsViewComponent, canActivate: [authGuard] },
  { path: 'lists/new', component: CreateComponent, canActivate: [authGuard] },
  {
    path: 'lists/:id',
    component: EditComponent,
    canActivate: [authGuard],
  },
  {
    path: 'groups/new',
    component: GroupAddComponent,
    canActivate: [authGuard],
  },
  {
    path: 'groups/edit/:id',
    component: GroupEditComponent,
    canActivate: [authGuard],
  },
  {
    path: 'statistics',
    component: StatisticsViewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'help',
    component: HelpComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user/edit',
    component: UserEditComponent,
    canActivate: [authGuard],
  },
  {
    path: 'notifications',
    component: NotificationsDetailComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'register', component: RegisterComponent },
];
