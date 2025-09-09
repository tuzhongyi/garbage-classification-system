import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GarbageManagementListIasDeviceRouteComponent } from '../../garbage-management-list/garbage-management-list-ias-device-route/garbage-management-list-ias-device-route.component';
import { DeviceRoutesStatisticItem } from '../../garbage-management-list/garbage-management-list-ias-device-route/garbage-management-list-ias-device-route.model';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';

@Component({
  selector: 'app-garbage-management-card-list-ias-device-route',
  imports: [
    CommonModule,
    GarbageManagementCardComponent,
    GarbageManagementListIasDeviceRouteComponent,
  ],
  templateUrl: './garbage-management-card-list-ias-device-route.component.html',
  styleUrl: './garbage-management-card-list-ias-device-route.component.less',
})
export class GarbageManagementCardListIasDeviceRouteComponent {
  title = '今日车辆行驶统计记录';

  count = 0;
  loading = true;

  on = {
    loaded: (datas: DeviceRoutesStatisticItem[]) => {
      this.loading = false;
      this.count = datas.length;
    },
  };
}
