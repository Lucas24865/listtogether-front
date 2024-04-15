import { Routes } from '@angular/router';
import { MainComponent } from './components/dashboard/main/main.component';
import { GroupsViewComponent } from './components/groups/groups-view/groups-view.component';
import { StatisticsViewComponent } from './components/statistics/statistics-view/statistics-view.component';
import { LoginComponent } from './components/login/login/login.component';
import { ForgotComponent } from './components/login/forgot/forgot.component';
import { RegisterComponent } from './components/login/register/register.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
    {path: '', component: MainComponent, canActivate: [authGuard]},
    {path: 'groups', component: GroupsViewComponent, canActivate: [authGuard]},
    {path: 'statistics', component: StatisticsViewComponent, canActivate: [authGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'forgot', component: ForgotComponent},
    {path: 'register', component: RegisterComponent},
];
