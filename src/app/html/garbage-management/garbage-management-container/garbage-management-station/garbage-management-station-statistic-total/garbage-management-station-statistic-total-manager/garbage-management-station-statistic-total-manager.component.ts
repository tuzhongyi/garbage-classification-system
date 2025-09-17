import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/select/hw-select/select-control.component';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { SelectDivisionComponent } from '../../../../../share/select/select-division/select-division.component';
import { GarbageManagementStationStatisticTotalTableComponent } from '../garbage-management-station-statistic-total-table/garbage-management-station-statistic-total-table.component';

@Component({
  selector: 'howell-garbage-management-station-statistic-total-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    SelectDivisionComponent,
    HowellSelectComponent,
    GarbageManagementStationStatisticTotalTableComponent,
  ],
  templateUrl:
    './garbage-management-station-statistic-total-manager.component.html',
  styleUrl:
    './garbage-management-station-statistic-total-manager.component.less',
})
export class GarbageManagementStationStatisticTotalManagerComponent {
  table = {
    args: {
      unit: TimeUnit.Day,
      date: new Date(),
      divisionId: undefined as string | undefined,
    },
    load: new EventEmitter<void>(),
  };

  on = {
    search: () => {
      this.table.load.emit();
    },
    export: () => {},
  };
}
