import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/select/hw-select/select-control.component';
import { DateTimePickerView } from '../../../../../../common/directives/date-time-picker/date-time-picker.directive';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { Language } from '../../../../../../common/tools/language';
import { GarbageManagementRecordEventIasStatisticDetailsArgs } from '../business/garbage-management-record-event-ias-statistic-details.model';
import { GarbageManagementRecordEventIasStatisticDetailsContainerComponent } from '../garbage-management-record-event-ias-statistic-details-container/garbage-management-record-event-ias-statistic-details-container.component';
import { GarbageManagementRecordEventIasStatisticDetailsManagerBusiness } from './garbage-management-record-event-ias-statistic-details-manager.business';
import { GarbageManagementRecordEventIasStatisticDetailsManagerSource } from './garbage-management-record-event-ias-statistic-details-manager.source';

@Component({
  selector:
    'howell-garbage-management-record-event-ias-statistic-details-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    HowellSelectComponent,
    GarbageManagementRecordEventIasStatisticDetailsContainerComponent,
  ],
  templateUrl:
    './garbage-management-record-event-ias-statistic-details-manager.component.html',
  styleUrl:
    './garbage-management-record-event-ias-statistic-details-manager.component.less',
  providers: [GarbageManagementRecordEventIasStatisticDetailsManagerBusiness],
})
export class GarbageManagementRecordEventIasStatisticDetailsManagerComponent
  implements OnInit
{
  constructor(
    private toastr: ToastrService,
    private business: GarbageManagementRecordEventIasStatisticDetailsManagerBusiness
  ) {}

  source = new GarbageManagementRecordEventIasStatisticDetailsManagerSource();
  TimeUnit = TimeUnit;

  date = {
    format: Language.YearMonthDay,
    week: false,
    view: {
      min: DateTimePickerView.month,
    },
  };

  chart = {
    args: new GarbageManagementRecordEventIasStatisticDetailsArgs(),

    load: new EventEmitter<GarbageManagementRecordEventIasStatisticDetailsArgs>(),
  };

  private init = {
    devices: () => {
      this.business.load().then((x) => {
        this.source.devices = x;
      });
    },
  };

  ngOnInit(): void {
    this.init.devices();
  }

  on = {
    search: () => {
      this.chart.load.emit(this.chart.args);
    },
    unit: () => {
      this.date.week = this.chart.args.unit == TimeUnit.Week;
      switch (this.chart.args.unit) {
        case TimeUnit.Month:
          this.date.view.min = DateTimePickerView.year;
          this.date.format = Language.YearMonth;
          break;
        case TimeUnit.Year:
          this.date.view.min = DateTimePickerView.decade;
          this.date.format = Language.Year;
          break;

        default:
          this.date.view.min = DateTimePickerView.month;
          this.date.format = Language.YearMonthDay;
          break;
      }
      this.on.search();
    },
  };
}
