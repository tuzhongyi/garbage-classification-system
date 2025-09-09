import { CommonModule, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { Language } from '../../../../../common/tools/language';
import { GarbageManagementChartRecordEventComponent } from '../component/garbage-management-chart-record-event.component';
import { IGarbageManagementChartRecordEventColor } from '../garbage-management-chart-record-event.model';
import { GarbageManagementChartRecordEventIasBusiness } from './garbage-management-chart-record-event-ias.business';

@Component({
  selector: 'howell-garbage-management-chart-record-event-ias',
  imports: [CommonModule, GarbageManagementChartRecordEventComponent],
  templateUrl: './garbage-management-chart-record-event-ias.component.html',
  styleUrl: './garbage-management-chart-record-event-ias.component.less',
  providers: [GarbageManagementChartRecordEventIasBusiness],
})
export class GarbageManagementChartRecordEventIasComponent {
  @Input() unit = TimeUnit.Day;
  @Input() color?: IGarbageManagementChartRecordEventColor;
  @Output() loaded = new EventEmitter<number[]>();

  constructor(private business: GarbageManagementChartRecordEventIasBusiness) {}
  language = {
    unit: () => {
      return Language.TimeUnit(this.unit);
    },
  };
  datas = [40, 60, 55, 50, 55, 65, 45];
  xAxis = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];

  ngOnInit(): void {
    this.load(this.unit);
  }

  private load(unit: TimeUnit) {
    this.business.load(unit).then((x) => {
      this.datas = x
        .filter((x) => x.value !== undefined)
        .map((x) => x.value ?? 0);
      this.loaded.emit(this.datas);
      this.xAxis = x.map((x) => formatDate(x.time, Language.HHmm, 'en'));

      if (this.xAxis.length <= 24) {
        for (let i = this.xAxis.length; i <= 24; i++) {
          let hour = `${i}`.padStart(2, '0');
          this.xAxis.push(`${hour}:00`);
        }
      }
    });
  }
}
