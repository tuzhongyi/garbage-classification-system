import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { GarbageManagementRankingRecordEventComponent } from '../../garbage-management-ranking/garbage-management-ranking-record-event/garbage-management-ranking-record-event.component';
import { GarbageManagementRankingRecordEventIndex } from '../../garbage-management-ranking/garbage-management-ranking-record-event/garbage-management-ranking-record-event.model';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';

@Component({
  selector: 'howell-garbage-management-card-ranking-record-event',
  imports: [
    CommonModule,
    GarbageManagementCardComponent,
    GarbageManagementRankingRecordEventComponent,
  ],
  templateUrl: './garbage-management-card-ranking-record-event.component.html',
  styleUrl: './garbage-management-card-ranking-record-event.component.less',
})
export class GarbageManagementCardRankingRecordEventComponent {
  @Input() display = [
    GarbageManagementRankingRecordEventIndex.illegaldrop,
    GarbageManagementRankingRecordEventIndex.garbagedropduration,
    GarbageManagementRankingRecordEventIndex.garbagedropcount,
    GarbageManagementRankingRecordEventIndex.mixedinto,
    GarbageManagementRankingRecordEventIndex.garbagefull,
  ];
  @Input() unit = TimeUnit.Day;
  @Input() index = GarbageManagementRankingRecordEventIndex.illegaldrop;

  get title() {
    return `${this.language.unit()}${this.language.index()}排名`;
  }

  private language = {
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
    index: () => {
      switch (this.index) {
        case GarbageManagementRankingRecordEventIndex.illegaldrop:
          return '垃圾落地事件';
        case GarbageManagementRankingRecordEventIndex.garbagedropcount:
          return '垃圾滞留数量';
        case GarbageManagementRankingRecordEventIndex.garbagedropduration:
          return '垃圾滞留时长';
        case GarbageManagementRankingRecordEventIndex.mixedinto:
          return '混合投放事件';
        case GarbageManagementRankingRecordEventIndex.garbagefull:
          return '垃圾满溢事件';
        case GarbageManagementRankingRecordEventIndex.illegalvehicle:
          return '垃圾清运事件';

        default:
          return '';
      }
    },
  };

  on = {
    index: (index: GarbageManagementRankingRecordEventIndex) => {
      this.index = index;
    },
  };
}
