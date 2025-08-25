import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GarbageManagementComponent } from './component/garbage-management.component';
import { GarbageManagementContainerComponent } from './garbage-management-container/garbage-management-container.component';

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
        component: GarbageManagementContainerComponent,
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class GarbageManagementRoutingModule {}
