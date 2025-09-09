import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GarbageManagementChartStationCountStateComponent } from '../../garbage-management-chart/garbage-management-chart-station-count/garbage-management-chart-station-count-state/garbage-management-chart-station-count-state.component';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';

@Component({
  selector: 'howell-garbage-management-card-chart-station-count-state',
  imports: [
    CommonModule,
    GarbageManagementCardComponent,
    GarbageManagementChartStationCountStateComponent,
  ],
  templateUrl:
    './garbage-management-card-chart-station-count-state.component.html',
  styleUrl:
    './garbage-management-card-chart-station-count-state.component.less',
})
export class GarbageManagementCardChartStationCountStateComponent {
  title = '任务完成率';
}
