import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/select/hw-select/select-control.component';
import { DateTimePickerView } from '../../../../../../common/directives/date-time-picker/date-time-picker.directive';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { Language } from '../../../../../../common/tools/language';
import { SelectDivisionComponent } from '../../../../../share/select/select-division/select-division.component';
import { SelectGarbageStationComponent } from '../../../../../share/select/select-garbage-station/select-garbage-station.component';

import { GarbageManagementRecordEventMixedIntoStatisticDetailsArgs } from '../garbage-management-record-event-mixed-into-statistic-details-container/business/garbage-management-record-event-mixed-into-statistic-details-container.model';
import { GarbageManagementRecordEventMixedIntoStatisticDetailsContainerComponent } from '../garbage-management-record-event-mixed-into-statistic-details-container/garbage-management-record-event-mixed-into-statistic-details-container.component';

@Component({
  selector:
    'howell-garbage-management-record-event-mixed-into-statistic-details-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    HowellSelectComponent,
    SelectDivisionComponent,
    SelectGarbageStationComponent,
    GarbageManagementRecordEventMixedIntoStatisticDetailsContainerComponent,
  ],
  templateUrl:
    './garbage-management-record-event-mixed-into-statistic-details-manager.component.html',
  styleUrl:
    './garbage-management-record-event-mixed-into-statistic-details-manager.component.less',
})
export class GarbageManagementRecordEventMixedIntoStatisticDetailsManagerComponent {
  TimeUnit = TimeUnit;
  date = {
    format: Language.YearMonthDay,
    week: false,
    view: {
      min: DateTimePickerView.month,
    },
  };

  chart = {
    args: new GarbageManagementRecordEventMixedIntoStatisticDetailsArgs(),
    load: new EventEmitter<GarbageManagementRecordEventMixedIntoStatisticDetailsArgs>(),
  };

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
