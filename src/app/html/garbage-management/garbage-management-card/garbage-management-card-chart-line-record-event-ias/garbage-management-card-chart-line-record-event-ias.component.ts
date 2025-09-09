import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { GarbageManagementChartRecordEventIasComponent } from '../../garbage-management-chart/garbage-management-chart-record-event/garbage-management-chart-record-event-ias/garbage-management-chart-record-event-ias.component';
import { IGarbageManagementChartRecordEventColor } from '../../garbage-management-chart/garbage-management-chart-record-event/garbage-management-chart-record-event.model';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';

@Component({
  selector: 'app-garbage-management-card-chart-line-record-event-ias',
  imports: [
    CommonModule,
    FormsModule,
    GarbageManagementCardComponent,
    GarbageManagementChartRecordEventIasComponent,
  ],
  templateUrl:
    './garbage-management-card-chart-line-record-event-ias.component.html',
  styleUrl:
    './garbage-management-card-chart-line-record-event-ias.component.less',
})
export class GarbageManagementCardChartLineRecordEventIasComponent {
  @Input() color?: IGarbageManagementChartRecordEventColor;

  unit = TimeUnit.Day;
  count = 0;

  TimeUnit = TimeUnit;

  get title() {
    return `${this.language.unit()}垃圾暴露 <span class="count">${
      this.count
    }</span> 起`;
  }

  language = {
    unit: () => {
      switch (this.unit) {
        case TimeUnit.Day:
          return '今日';
        case TimeUnit.Week:
          return '本周';
        case TimeUnit.Month:
          return '本月';
        case TimeUnit.Year:
          return '今年';
        default:
          return '';
      }
    },
  };

  on = {
    loaded: (datas: number[]) => {
      this.count = datas.reduce((a, b) => a + b, 0);
    },
  };
}
