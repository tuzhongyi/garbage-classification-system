import { CommonModule, formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { ChartTool } from '../../../../../common/tools/chart-tool/chart.tool';
import { Language } from '../../../../../common/tools/language';
import { GarbageManagementChartLineComponent } from '../../garbage-management-chart-line/garbage-management-chart-line.component';
import {
  IGarbageManagementChartColor,
  IGarbageManagementChartData,
  ITimeData,
} from '../../garbage-management-chart-line/garbage-management-chart-line.model';
import { GarbageManagementChartRecordEventIasBusiness } from './garbage-management-chart-record-event-ias.business';

@Component({
  selector: 'howell-garbage-management-chart-record-event-ias',
  imports: [CommonModule, GarbageManagementChartLineComponent],
  templateUrl: './garbage-management-chart-record-event-ias.component.html',
  styleUrl: './garbage-management-chart-record-event-ias.component.less',
  providers: [GarbageManagementChartRecordEventIasBusiness],
})
export class GarbageManagementChartRecordEventIasComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() unit = TimeUnit.Day;
  @Input() color?: IGarbageManagementChartColor;
  @Output() loaded = new EventEmitter<number[]>();

  constructor(private business: GarbageManagementChartRecordEventIasBusiness) {}

  date = new Date();
  language = {
    unit: () => {
      return Language.TimeUnit(this.unit);
    },
  };
  data?: IGarbageManagementChartData;
  interval = 0;
  xAxis = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];

  private subscription = new Subscription();
  private regist() {
    if (this._load) {
      let sub = this._load.subscribe(() => {
        this.load(this.unit, this.date);
      });
      this.subscription.add(sub);
    }
  }
  private load(unit: TimeUnit, date: Date) {
    this.business.load(unit, date).then((x) => {
      this.data = {
        Id: '',
        Name: '',
        color: this.color,
        datas: x
          .filter((x) => x.value !== undefined)
          .map<ITimeData<number>>((x) => {
            return { time: x.time, value: x.value ?? 0 };
          }),
      };
      let datas = this.data.datas.map((x) => x.value);
      this.loaded.emit(datas);
      this.xAxis = x.map((x) => formatDate(x.time, Language.HHmm, 'en'));

      this.xAxis = ChartTool.axis.x.unit(unit, {
        end: true,
        date: date,
        first: 1,
      });
      switch (unit) {
        case TimeUnit.Day:
          this.interval = 3;
          break;
        case TimeUnit.Month:
          this.interval = 1;
          break;
        default:
          this.interval = 0;
          break;
      }
    });
  }
  private change = {
    unit: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load(this.unit, this.date);
      }
    },
  };

  ngOnInit(): void {
    this.regist();
    this.load(this.unit, this.date);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.unit(changes['unit']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
