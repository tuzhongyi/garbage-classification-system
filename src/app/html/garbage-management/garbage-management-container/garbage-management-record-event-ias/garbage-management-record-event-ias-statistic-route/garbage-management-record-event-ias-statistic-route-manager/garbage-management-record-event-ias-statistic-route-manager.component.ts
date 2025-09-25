import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/select/hw-select/select-control.component';
import { DateTimePickerView } from '../../../../../../common/directives/date-time-picker/date-time-picker.directive';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { Language } from '../../../../../../common/tools/language';
import { GarbageManagementRecordEventIasStatisticRouteChartContainerComponent } from '../garbage-management-record-event-ias-statistic-route-chart-container/garbage-management-record-event-ias-statistic-route-chart-container.component';
import { GarbageManagementRecordEventIasStatisticRouteInfoComponent } from '../garbage-management-record-event-ias-statistic-route-info/garbage-management-record-event-ias-statistic-route-info.component';
import { GarbageManagementRecordEventIasStatisticRouteMapComponent } from '../garbage-management-record-event-ias-statistic-route-map/garbage-management-record-event-ias-statistic-route-map.component';
import {
  GarbageManagementRecordEventIasStatisticRouteArgs,
  GarbageManagementRecordEventIasStatisticRouteType,
} from '../garbage-management-record-event-ias-statistic-route.model';
import { GarbageManagementRecordEventIasStatisticRouteManagerSource } from './garbage-management-record-event-ias-statistic-route-manager.source';

@Component({
  selector:
    'howell-garbage-management-record-event-ias-statistic-route-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    HowellSelectComponent,
    GarbageManagementRecordEventIasStatisticRouteMapComponent,
    GarbageManagementRecordEventIasStatisticRouteInfoComponent,
    GarbageManagementRecordEventIasStatisticRouteChartContainerComponent,
  ],
  templateUrl:
    './garbage-management-record-event-ias-statistic-route-manager.component.html',
  styleUrl:
    './garbage-management-record-event-ias-statistic-route-manager.component.less',
  providers: [GarbageManagementRecordEventIasStatisticRouteManagerSource],
})
export class GarbageManagementRecordEventIasStatisticRouteManagerComponent {
  constructor(
    private toastr: ToastrService,
    public source: GarbageManagementRecordEventIasStatisticRouteManagerSource
  ) {}

  args = new GarbageManagementRecordEventIasStatisticRouteArgs();
  load = new EventEmitter<GarbageManagementRecordEventIasStatisticRouteArgs>();

  TimeUnit = TimeUnit;
  RouteStatisticType = GarbageManagementRecordEventIasStatisticRouteType;
  date = {
    format: Language.YearMonthDay,
    week: false,
    view: {
      min: DateTimePickerView.month,
    },
  };

  on = {
    unit: () => {
      this.date.week = this.args.unit == TimeUnit.Week;
      switch (this.args.unit) {
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
    },
    search: () => {
      if (!this.args.deviceId) {
        this.toastr.warning('请选择巡逻车辆');
        return;
      }
      this.load.emit(this.args);
    },
  };
}
