import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GarbageManagementChartIasDeviceStateComponent } from '../../garbage-management-chart/garbage-management-chart-ias-device-state/garbage-management-chart-ias-device-state.component';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';

@Component({
  selector: 'app-garbage-management-card-chart-ias-device-state',
  imports: [
    CommonModule,
    GarbageManagementCardComponent,
    GarbageManagementChartIasDeviceStateComponent,
  ],
  templateUrl:
    './garbage-management-card-chart-ias-device-state.component.html',
  styleUrl: './garbage-management-card-chart-ias-device-state.component.less',
})
export class GarbageManagementCardChartIasDeviceStateComponent {
  title = '车辆状态';
}
