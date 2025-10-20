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
import { GarbageManagementRecordEventIllegalDumpArgs } from '../../garbage-management-record-event-illegal-dump.model';
import { GarbageManagementRecordEventIllegalDumpStatisticDetailsContainerComponent } from '../garbage-management-record-event-illegal-dump-statistic-details-container/garbage-management-record-event-illegal-dump-statistic-details-container.component';
import { GarbageManagementRecordEventIllegalDumpStatisticDetailsArgs } from '../garbage-management-record-event-illegal-dump-statistic-details-container/garbage-management-record-event-illegal-dump-statistic-details-container.model';

@Component({
  selector:
    'howell-garbage-management-record-event-illegal-dump-statistic-details-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    HowellSelectComponent,
    SelectDivisionComponent,
    SelectSearchGarbageStationComponent,
    GarbageManagementRecordEventIllegalDumpStatisticDetailsContainerComponent,
  ],
  templateUrl:
    './garbage-management-record-event-illegal-dump-statistic-details-manager.component.html',
  styleUrl:
    './garbage-management-record-event-illegal-dump-statistic-details-manager.component.less',
})
export class GarbageManagementRecordEventIllegalDumpStatisticDetailsManagerComponent
  implements OnChanges
{
  @Input() args: GarbageManagementRecordEventIllegalDumpArgs = {};
  @Output() argsChange =
    new EventEmitter<GarbageManagementRecordEventIllegalDumpArgs>();

  constructor() {}

  TimeUnit = TimeUnit;
  date = {
    format: Language.YearMonthDay,
    week: false,
    view: {
      min: DateTimePickerView.month,
    },
  };

  chart = {
    args: new GarbageManagementRecordEventIllegalDumpStatisticDetailsArgs(),
    load: new EventEmitter<GarbageManagementRecordEventIllegalDumpStatisticDetailsArgs>(),
    station: {
      types: [StationType.IllegalDump],
    },
  };

  private change = {
    args: (simple: SimpleChange) => {
      if (simple) {
        if (this.chart.args.stationId != this.args.stationId) {
          this.chart.args.stationId = this.args.stationId;
        }
        if (this.chart.args.divisionId != this.args.divisionId) {
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
