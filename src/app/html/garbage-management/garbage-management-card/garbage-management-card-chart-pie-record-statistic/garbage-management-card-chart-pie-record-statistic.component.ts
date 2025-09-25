import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GarbageManagementChartPieRecordStatisticContainerComponent } from '../../garbage-management-chart/garbage-management-chart-pie-record-statistic/garbage-management-chart-pie-record-statistic-container/garbage-management-chart-pie-record-statistic-container.component';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';

@Component({
  selector: 'app-garbage-management-card-chart-pie-record-statistic',
  imports: [
    CommonModule,
    GarbageManagementCardComponent,
    GarbageManagementChartPieRecordStatisticContainerComponent,
  ],
  templateUrl:
    './garbage-management-card-chart-pie-record-statistic.component.html',
  styleUrl:
    './garbage-management-card-chart-pie-record-statistic.component.less',
})
export class GarbageManagementCardChartPieRecordStatisticComponent {
  @Input() load?: EventEmitter<void>;
  @Output() itemclick = new EventEmitter<number>();
  title = '今日事件统计';

  on = {
    item: {
      click: (data: number) => {
        this.itemclick.emit(data);
      },
    },
  };
}
