import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GarbageManagementComponent } from './component/garbage-management.component';
import { GarbageManagementManagerComponent } from './garbage-management-manager/garbage-management-manager.component';

const routes: Routes = [
  {
    path: '',
    component: GarbageManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full',
      },
      {
        path: 'index',
        component: GarbageManagementManagerComponent,
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class GarbageManagementRoutingModule {}
