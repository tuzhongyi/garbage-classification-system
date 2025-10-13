import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventType } from '../../../../common/enum/event-type.enum';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { ColorTool } from '../../../../common/tools/color-tool/color.tool';
import { Language } from '../../../../common/tools/language';
import { IGarbageManagementChartColor } from '../../garbage-management-chart/garbage-management-chart-line/garbage-management-chart-line.model';
import { GarbageManagementChartRecordEventContainerComponent } from '../../garbage-management-chart/garbage-management-chart-record-event/garbage-management-chart-record-event-container/garbage-management-chart-record-event-container.component';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';

@Component({
  selector: 'howell-garbage-management-card-chart-line-record-event-multiple',
  imports: [
    CommonModule,
    FormsModule,
    GarbageManagementCardComponent,
    GarbageManagementChartRecordEventContainerComponent,
  ],
  templateUrl:
    './garbage-management-card-chart-line-record-event-multiple.component.html',
  styleUrl:
    './garbage-management-card-chart-line-record-event-multiple.component.less',
})
export class GarbageManagementCardChartLineRecordEventMultipleComponent
  implements OnInit
{
  @Input() load?: EventEmitter<void>;
  @Input() types: EventType[] = [];

  unit = TimeUnit.Day;
  count = 0;
  color?: IGarbageManagementChartColor;
  type = EventType.GarbageFull;

  Type = EventType;
  TimeUnit = TimeUnit;
  Language = Language;

  get title() {
    return `${this.language.unit()}${this.language.type()} <span class="count">${
      this.count
    }</span> 起`;
  }

  ngOnInit(): void {
    if (this.types.length > 0) {
      this.type = this.types[0];
      this.on.type();
    }
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
      if (this.type) {
        return Language.EventType(this.type);
      }
      return '';
    },
  };

  on = {
    loaded: (datas: number[]) => {
      this.count = datas.reduce((a, b) => a + b, 0);
    },
    type: () => {
      switch (this.type) {
        case EventType.IllegalDrop:
          this.color = ColorTool.chart.line.record.illegaldrop;
          break;
        case EventType.MixedInto:
          this.color = ColorTool.chart.line.record.mixedinto;
          break;
        case EventType.GarbageFull:
          this.color = ColorTool.chart.line.record.garbagefull;
          break;
        case EventType.GarbageDrop:
          this.color = ColorTool.chart.line.record.garbagedrop;
          break;
        case EventType.IllegalDrop2:
          this.color = ColorTool.chart.line.record.illegaldump;
          break;
        case EventType.IllegalVehicle:
          this.color = ColorTool.chart.line.record.illegalvehicle;
          break;
        default:
          break;
      }
    },
  };
}
