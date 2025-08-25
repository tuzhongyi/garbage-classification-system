import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../../../../common/network/model/garbage-station/user.model';
import { LocalStorageService } from '../../../../common/storage/local.storage';
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
export class GarbageManagementHeaderComponent {
  title = '垃圾分类智能监管平台';

  constructor(private local: LocalStorageService) {
    this.user = local.user;
  }

  user?: User;
}
