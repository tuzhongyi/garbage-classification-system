import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { GarbageManagementChartStationCountComponent } from '../../garbage-management-chart/garbage-management-chart-station-count/component/garbage-management-chart-station-count.component';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';

@Component({
  selector: 'howell-garbage-management-card-chart-station-count',
  imports: [
    CommonModule,
    GarbageManagementCardComponent,
    GarbageManagementChartStationCountComponent,
  ],
  templateUrl: './garbage-management-card-chart-station-count.component.html',
  styleUrl: './garbage-management-card-chart-station-count.component.less',
})
export class GarbageManagementCardChartStationCountComponent {
  @Input() load?: EventEmitter<void>;
  title = '投放点运行状态';
}
