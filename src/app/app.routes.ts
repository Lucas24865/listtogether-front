import {Routes} from '@angular/router';
import {MainComponent} from './components/dashboard/main/main.component';
import {GroupsViewComponent} from './components/groups/groups-view/groups-view.component';
import {LoginComponent} from './components/login/login/login.component';
import {ForgotComponent} from './components/login/forgot/forgot.component';
import {RegisterComponent} from './components/login/register/register.component';
import {authGuard} from './guards/auth.guard';
import {GroupAddComponent} from './components/groups/group-add/group-add.component';
import {GroupEditComponent} from './components/groups/group-edit/group-edit.component';
import {UserViewComponent} from "./components/users/users-view/user-view.component";

export const routes: Routes = [
  {path: '', component: MainComponent, canActivate: [authGuard]},
  {path: 'users', component: UserViewComponent, canActivate: [authGuard]},
  {path: 'groups', component: GroupsViewComponent, canActivate: [authGuard]},
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
  {path: 'login', component: LoginComponent},
  {path: 'forgot', component: ForgotComponent},
  {path: 'register', component: RegisterComponent},
];
