import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventType } from '../../../../common/enum/event-type.enum';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { Language } from '../../../../common/tools/language';
import { GarbageManagementChartRecordEventContainerComponent } from '../../garbage-management-chart/garbage-management-chart-record-event/garbage-management-chart-record-event-container/garbage-management-chart-record-event-container.component';
import { IGarbageManagementChartRecordEventColor } from '../../garbage-management-chart/garbage-management-chart-record-event/garbage-management-chart-record-event.model';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';

@Component({
  selector: 'howell-garbage-management-card-chart-line-record-event',
  imports: [
    CommonModule,
    FormsModule,
    GarbageManagementCardComponent,
    GarbageManagementChartRecordEventContainerComponent,
  ],
  templateUrl:
    './garbage-management-card-chart-line-record-event.component.html',
  styleUrl: './garbage-management-card-chart-line-record-event.component.less',
})
export class GarbageManagementCardChartLineRecordEventComponent {
  @Input() load?: EventEmitter<void>;
  @Input() type = EventType.MixedInto;
  @Input() color?: IGarbageManagementChartRecordEventColor;

  unit = TimeUnit.Day;
  count = 0;
  Type = EventType;
  TimeUnit = TimeUnit;

  get title() {
    return `${this.language.unit()}${this.language.type()} <span class="count">${
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
    type: () => {
      return Language.EventType(this.type);
    },
  };

  on = {
    loaded: (datas: number[]) => {
      this.count = datas.reduce((a, b) => a + b, 0);
    },
  };
}
