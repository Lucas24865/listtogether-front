import { Routes } from '@angular/router';
import { MainComponent } from './components/dashboard/main/main.component';
import { GroupsViewComponent } from './components/groups/groups-view/groups-view.component';
import { StatisticsViewComponent } from './components/statistics/statistics-view/statistics-view.component';
export const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'groups', component: GroupsViewComponent},
    {path: 'statistics', component: StatisticsViewComponent},
];
