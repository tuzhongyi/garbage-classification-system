import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/select/hw-select/select-control.component';
import { DateTimePickerView } from '../../../../../../common/directives/date-time-picker/date-time-picker.directive';
import { StationType } from '../../../../../../common/enum/station-type.enum';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { Language } from '../../../../../../common/tools/language';
import { SelectDivisionComponent } from '../../../../../share/select/select-division/select-division.component';
import { SelectSearchGarbageStationComponent } from '../../../../../share/select/select-garbage-station-search/select-garbage-station-search.component';
import { GarbageManagementRecordEventGarbageDropArgs } from '../../garbage-management-record-event-garbage-drop.model';
import { GarbageManagementRecordEventGarbageDropStatisticDetailsArgs } from '../garbage-management-record-event-garbage-drop-statistic-details-container/business/garbage-management-record-event-garbage-drop-statistic-details-container.model';
import { GarbageManagementRecordEventGarbageDropStatisticDetailsContainerComponent } from '../garbage-management-record-event-garbage-drop-statistic-details-container/garbage-management-record-event-garbage-drop-statistic-details-container.component';

@Component({
  selector:
    'howell-garbage-management-record-event-garbage-drop-statistic-details-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    HowellSelectComponent,
    SelectDivisionComponent,
    SelectSearchGarbageStationComponent,
    GarbageManagementRecordEventGarbageDropStatisticDetailsContainerComponent,
  ],
  templateUrl:
    './garbage-management-record-event-garbage-drop-statistic-details-manager.component.html',
  styleUrl:
    './garbage-management-record-event-garbage-drop-statistic-details-manager.component.less',
})
export class GarbageManagementRecordEventGarbageDropStatisticDetailsManagerComponent
  implements OnChanges
{
  @Input() args: GarbageManagementRecordEventGarbageDropArgs = {};
  @Output() argsChange =
    new EventEmitter<GarbageManagementRecordEventGarbageDropArgs>();

  TimeUnit = TimeUnit;
  date = {
    format: Language.YearMonthDay,
    week: false,
    view: {
      min: DateTimePickerView.month,
    },
  };

  chart = {
    args: new GarbageManagementRecordEventGarbageDropStatisticDetailsArgs(),
    load: new EventEmitter<GarbageManagementRecordEventGarbageDropStatisticDetailsArgs>(),
    station: {
      types: [StationType.Garbage, StationType.Plus, StationType.Smart],
    },
  };
  private change = {
    args: (simple: SimpleChange) => {
      if (simple) {
        if (
          this.args.stationId &&
          this.chart.args.stationId != this.args.stationId
        ) {
          this.chart.args.stationId = this.args.stationId;
        }
        if (
          this.args.divisionId &&
          this.chart.args.divisionId != this.args.divisionId
        ) {
          this.chart.args.divisionId = this.args.divisionId;
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.args(changes['args']);
  }

  on = {
    change: {
      station: () => {
        this.args.stationId = this.chart.args.stationId;
        this.argsChange.emit(this.args);
      },
      division: () => {
        this.args.divisionId = this.chart.args.divisionId;
        this.argsChange.emit(this.args);
      },
    },
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
