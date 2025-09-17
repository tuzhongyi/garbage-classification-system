import { CommonModule, formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { ChartTool } from '../../../../../common/tools/chart-tool/chart.tool';
import { Language } from '../../../../../common/tools/language';
import { GarbageManagementChartRecordEventComponent } from '../component/garbage-management-chart-record-event.component';
import {
  IGarbageManagementChartRecordEventColor,
  IGarbageManagementChartRecordEventData,
  ITimeData,
} from '../garbage-management-chart-record-event.model';
import { GarbageManagementChartRecordEventIasBusiness } from './garbage-management-chart-record-event-ias.business';

@Component({
  selector: 'howell-garbage-management-chart-record-event-ias',
  imports: [CommonModule, GarbageManagementChartRecordEventComponent],
  templateUrl: './garbage-management-chart-record-event-ias.component.html',
  styleUrl: './garbage-management-chart-record-event-ias.component.less',
  providers: [GarbageManagementChartRecordEventIasBusiness],
})
export class GarbageManagementChartRecordEventIasComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() unit = TimeUnit.Day;
  @Input() color?: IGarbageManagementChartRecordEventColor;
  @Output() loaded = new EventEmitter<number[]>();

  constructor(private business: GarbageManagementChartRecordEventIasBusiness) {}

  date = new Date();
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
    });
  }

  ngOnInit(): void {
    this.regist();
    this.load(this.unit, this.date);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
