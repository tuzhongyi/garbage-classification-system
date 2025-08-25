import { Routes } from '@angular/router';
import { AuthorizationActivate } from '../common/network/request/auth/authorization.activate';
import { RoutePath } from './app-routing.path';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RoutePath.login,
    pathMatch: 'full',
  },
  {
    path: RoutePath.login,
    component: LoginComponent,
  },
  {
    path: RoutePath.garbage_system,
    loadChildren: () =>
      import('./garbage-management/garbage-management.module').then(
        (mod) => mod.GarbageManagementModule
      ),
    canActivate: [AuthorizationActivate],
  },
];
