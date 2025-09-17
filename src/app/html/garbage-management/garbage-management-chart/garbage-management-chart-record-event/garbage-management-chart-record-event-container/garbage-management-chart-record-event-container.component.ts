import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { EventType } from '../../../../../common/enum/event-type.enum';
import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { ChartTool } from '../../../../../common/tools/chart-tool/chart.tool';
import { Language } from '../../../../../common/tools/language';
import { GarbageManagementChartRecordEventComponent } from '../component/garbage-management-chart-record-event.component';
import {
  IGarbageManagementChartRecordEventColor,
  IGarbageManagementChartRecordEventData,
} from '../garbage-management-chart-record-event.model';
import { GarbageManagementChartRecordEventBusiness } from './business/garbage-management-chart-record-event-container.business';
import { GarbageManagementChartRecordEventService } from './business/garbage-management-chart-record-event-container.service';

@Component({
  selector: 'howell-garbage-management-chart-record-event-container',
  imports: [CommonModule, GarbageManagementChartRecordEventComponent],
  templateUrl:
    './garbage-management-chart-record-event-container.component.html',
  styleUrl: './garbage-management-chart-record-event-container.component.less',
  providers: [
    GarbageManagementChartRecordEventService,
    GarbageManagementChartRecordEventBusiness,
  ],
})
export class GarbageManagementChartRecordEventContainerComponent
  implements OnInit, OnChanges
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() date = new Date();
  @Input() unit = TimeUnit.Day;
  @Input() color?: IGarbageManagementChartRecordEventColor;
  @Input() type = EventType.GarbageFull;
  @Output() loaded = new EventEmitter<number[]>();

  constructor(private business: GarbageManagementChartRecordEventBusiness) {}

  language = {
    unit: () => {
      return Language.TimeUnit(this.unit);
    },
  };
  data?: IGarbageManagementChartRecordEventData;
  xAxis = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];
  private subscription = new Subscription();
  private regist() {
    if (this._load) {
      let sub = this._load.subscribe(() => {
        this.load(this.type, this.unit, this.date);
      });
      this.subscription.add(sub);
    }
  }

  ngOnInit(): void {
    this.regist();
    this.load(this.type, this.unit, this.date);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.unit(changes['unit']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  private change = {
    unit: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load(this.type, this.unit, this.date);
      }
    },
  };

  private load(type: EventType, unit: TimeUnit, date: Date) {
    this.business.load(type, unit, date).then((x) => {
      this.data = {
        Id: '',
        Name: '',
        color: this.color,
        datas: x
          .filter((x) => x.value !== undefined)
          .map((x) => {
            return { time: x.time, value: x.value ?? 0 };
          }),
      };
      let datas = this.data.datas.map((x) => x.value);
      this.loaded.emit(datas);

      this.xAxis = ChartTool.axis.x.unit(unit, {
        end: true,
        date: date,
        first: 1,
      });
    });
  }
}
