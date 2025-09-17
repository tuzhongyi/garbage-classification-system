import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { DateTimePickerView } from '../../../../../../common/directives/date-time-picker/date-time-picker.directive';
import { ChartType } from '../../../../../../common/enum/chart-type.enum copy';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { IIdNameModel } from '../../../../../../common/network/model/model.interface';
import { Language } from '../../../../../../common/tools/language';
import { SelectMultipleComponent } from '../../../../../share/select/select-multiple/select-multiple.component';
import { GarbageManagementStationStatisticDetailsContainerComponent } from '../garbage-management-station-statistic-details-container/garbage-management-station-statistic-details-container.component';
import { GarbageManagementStationStatisticDetailsArgs } from '../garbage-management-station-statistic-details.model';
import { GarbageManagementStationStatisticDetailsManagerBusiness } from './business/garbage-management-station-statistic-details-manager.business';
import { GarbageManagementStationStatisticDetailsManagerSource } from './garbage-management-station-statistic-details-manager.source';

@Component({
  selector: 'howell-garbage-management-station-statistic-details-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    SelectMultipleComponent,
    GarbageManagementStationStatisticDetailsContainerComponent,
  ],
  templateUrl:
    './garbage-management-station-statistic-details-manager.component.html',
  styleUrl:
    './garbage-management-station-statistic-details-manager.component.less',
  providers: [
    GarbageManagementStationStatisticDetailsManagerBusiness,
    GarbageManagementStationStatisticDetailsManagerSource,
  ],
})
export class GarbageManagementStationStatisticDetailsManagerComponent
  implements OnInit
{
  constructor(
    private business: GarbageManagementStationStatisticDetailsManagerBusiness,
    public source: GarbageManagementStationStatisticDetailsManagerSource,
    private toastr: ToastrService
  ) {}

  date = {
    format: Language.YearMonthDay,
    week: true,
    view: {
      min: DateTimePickerView.day,
    },
  };

  chart = {
    args: new GarbageManagementStationStatisticDetailsArgs(),
    load: new EventEmitter<GarbageManagementStationStatisticDetailsArgs>(),
    type: ChartType.bar,
  };

  ChartType = ChartType;

  private init() {
    this.business.load().then((stations) => {
      this.source.stations = stations;
    });
  }

  ngOnInit(): void {
    this.init();
  }

  on = {
    stations: (datas: IIdNameModel[]) => {
      this.chart.args.stationIds = datas.map((x) => x.Id);
    },
    search: () => {
      if (this.chart.args.stationIds.length == 0) {
        this.toastr.warning('请选择投放点');
        return;
      }
      if (this.chart.args.stationIds.length > 5) {
        this.toastr.warning('最多选择5个投放点');
        return;
      }
      this.chart.load.emit(this.chart.args);
    },
    unit: () => {
      this.date.week = this.chart.args.unit == TimeUnit.Week;
      switch (this.chart.args.unit) {
        case TimeUnit.Month:
          this.date.view.min = DateTimePickerView.year;
          break;
        case TimeUnit.Year:
          this.date.view.min = DateTimePickerView.decade;
          break;

        default:
          this.date.view.min = DateTimePickerView.month;
          break;
      }
    },
  };
}
