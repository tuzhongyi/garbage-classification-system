import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { GarbageManagementChartStationStateComponent } from '../../garbage-management-chart/garbage-management-chart-station-state/garbage-management-chart-station-state.component';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';

@Component({
  selector: 'howell-garbage-management-card-chart-station-state',
  imports: [
    CommonModule,
    GarbageManagementCardComponent,
    GarbageManagementChartStationStateComponent,
  ],
  templateUrl: './garbage-management-card-chart-station-state.component.html',
  styleUrl: './garbage-management-card-chart-station-state.component.less',
})
export class GarbageManagementCardChartStationStateComponent {
  @Input() load?: EventEmitter<void>;
  title = '今日投放点状态';
}
