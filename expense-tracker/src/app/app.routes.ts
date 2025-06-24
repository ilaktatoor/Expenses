import { Routes } from '@angular/router';
import { ReportsComponent } from './pages/reports/reports.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserFormComponent } from './componets/user-form/user-form.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent,pathMatch: 'full'},
  { path: 'report', component: ReportsComponent},
    { path: 'users', component: UserFormComponent }
];

