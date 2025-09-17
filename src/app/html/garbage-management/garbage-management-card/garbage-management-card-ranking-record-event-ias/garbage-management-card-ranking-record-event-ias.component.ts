import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { IasRecordEventStatisticType } from '../../garbage-management-ranking/garbage-management-ranking-record-event-ias/business/garbage-management-ranking-record-event-ias.model';
import { GarbageManagementRankingRecordEventIasComponent } from '../../garbage-management-ranking/garbage-management-ranking-record-event-ias/garbage-management-ranking-record-event-ias.component';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';

@Component({
  selector: 'app-garbage-management-card-ranking-record-event-ias',
  imports: [
    CommonModule,
    FormsModule,
    GarbageManagementCardComponent,
    GarbageManagementRankingRecordEventIasComponent,
  ],
  templateUrl:
    './garbage-management-card-ranking-record-event-ias.component.html',
  styleUrl: './garbage-management-card-ranking-record-event-ias.component.less',
})
export class GarbageManagementCardRankingRecordEventIasComponent {
  @Input() load?: EventEmitter<void>;
  @Input() unit = TimeUnit.Day;
  @Input() index = IasRecordEventStatisticType.grid;

  get title() {
    return `${this.language.unit()}${this.language.index()}排名`;
  }

  TimeUnit = TimeUnit;

  language = {
    unit: () => {
      switch (this.unit) {
        case TimeUnit.Day:
          return '今日';
        case TimeUnit.Week:
          return '本周';
        case TimeUnit.Month:
          return '本月';
        default:
          return '';
      }
    },
    index: () => {
      switch (this.index) {
        case IasRecordEventStatisticType.grid:
          return '行政网格事件';
        case IasRecordEventStatisticType.division:
          return '行政区划事件';
        default:
          return '';
      }
    },
  };

  on = {
    index: (index: IasRecordEventStatisticType) => {
      this.index = index;
    },
  };
}
