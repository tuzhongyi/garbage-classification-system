import { CommonModule, formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EventType } from '../../../../../common/enum/event-type.enum';
import { Language } from '../../../../../common/tools/language';
import { GarbageManagementChartRecordEventComponent } from '../component/garbage-management-chart-record-event.component';
import { GarbageManagementChartRecordEventBusiness } from '../garbage-management-chart-record-event.business';

@Component({
  selector: 'howell-garbage-management-chart-record-event-illegal-drop',
  imports: [CommonModule, GarbageManagementChartRecordEventComponent],
  templateUrl:
    './garbage-management-chart-record-event-illegal-drop.component.html',
  styleUrl:
    './garbage-management-chart-record-event-illegal-drop.component.less',
  providers: [GarbageManagementChartRecordEventBusiness],
})
export class GarbageManagementChartRecordEventIllegalDropComponent
  implements OnInit
{
  @Input() date = new Date();
  constructor(private business: GarbageManagementChartRecordEventBusiness) {}
  private type = EventType.IllegalDrop;
  title = Language.EventType(this.type);
  datas = [40, 60, 55, 50, 55, 65, 45];
  xAxis = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];

  ngOnInit(): void {
    this.load(this.date);
  }

  private load(date: Date) {
    this.business.load(EventType.IllegalDrop, date).then((x) => {
      this.datas = x
        .filter((x) => x.value !== undefined)
        .map((x) => x.value ?? 0);
      this.xAxis = x.map((x) => formatDate(x.time, Language.HHmm, 'en'));

      if (this.xAxis.length < 24) {
        for (let i = this.xAxis.length; i <= 24; i++) {
          let hour = `${i}`.padStart(2, '0');
          this.xAxis.push(`${hour}:00`);
        }
      }
    });
  }
}
