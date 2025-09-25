import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../common/network/model/garbage-station/user.model';
import { LocalStorageService } from '../../../../common/storage/local.storage';
import { RoutePath } from '../../../app-routing.path';
import { GarbageManagementHeaderDatetimeComponent } from '../garbage-management-header-datetime/garbage-management-header-datetime.component';
import { GarbageManagementHeaderOperationComponent } from '../garbage-management-header-operation/garbage-management-header-operation.component';

@Component({
  selector: 'howell-garbage-management-header',
  imports: [
    CommonModule,
    GarbageManagementHeaderDatetimeComponent,
    GarbageManagementHeaderOperationComponent,
  ],
  templateUrl: './garbage-management-header.component.html',
  styleUrl: './garbage-management-header.component.less',
})
export class GarbageManagementHeaderComponent implements OnInit, OnDestroy {
  title = '垃圾分类智能监管平台';

  constructor(private local: LocalStorageService, private router: Router) {
    this.user = local.user;
  }

  user?: User;

  handle?: any;

  ngOnInit(): void {
    this.handle = this.menu.close;
    window.addEventListener('click', this.handle);
  }
  ngOnDestroy(): void {
    if (this.handle) {
      window.removeEventListener('click', this.handle);
    }
  }

  menu = {
    opened: false,
    close: () => {
      this.menu.opened = false;
    },
    on: {
      setting: (e: Event) => {
        e.stopPropagation();
        this.menu.opened = !this.menu.opened;
      },
      logout: () => {
        this.router.navigateByUrl(`/${RoutePath.login}`);
      },
    },
  };
}
