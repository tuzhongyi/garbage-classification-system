import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateTimeControlComponent } from '../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../common/components/select/hw-select/select-control.component';
import { DateTimePickerView } from '../../../../../common/directives/date-time-picker/date-time-picker.directive';
import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { Language } from '../../../../../common/tools/language';
import { GarbageManagementStreetDeviceRouteChartContainerComponent } from '../garbage-management-street-device-route-chart-container/garbage-management-street-device-route-chart-container.component';
import { GarbageManagementStreetDeviceRouteInfoComponent } from '../garbage-management-street-device-route-info/garbage-management-street-device-route-info.component';
import { GarbageManagementStreetDeviceRouteMapSettingsComponent } from '../garbage-management-street-device-route-map-settings/garbage-management-street-device-route-map-settings.component';
import { GarbageManagementStreetDeviceRouteMapComponent } from '../garbage-management-street-device-route-map/garbage-management-street-device-route-map.component';
import {
  GarbageManagementStreetDeviceRouteArgs,
  GarbageManagementStreetDeviceRouteType,
} from '../garbage-management-street-device-route.model';
import { GarbageManagementStreetDeviceRouteManagerSource } from './garbage-management-street-device-route-manager.source';

@Component({
  selector: 'howell-garbage-management-street-device-route-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    HowellSelectComponent,
    GarbageManagementStreetDeviceRouteMapComponent,
    GarbageManagementStreetDeviceRouteMapSettingsComponent,
    GarbageManagementStreetDeviceRouteInfoComponent,
    GarbageManagementStreetDeviceRouteChartContainerComponent,
  ],
  templateUrl:
    './garbage-management-street-device-route-manager.component.html',
  styleUrl: './garbage-management-street-device-route-manager.component.less',
  providers: [GarbageManagementStreetDeviceRouteManagerSource],
})
export class GarbageManagementStreetDeviceRouteManagerComponent
  implements OnChanges, OnInit
{
  @Input() deviceId?: string;
  constructor(
    private toastr: ToastrService,
    public source: GarbageManagementStreetDeviceRouteManagerSource
  ) {}

  args = new GarbageManagementStreetDeviceRouteArgs();
  load = new EventEmitter<GarbageManagementStreetDeviceRouteArgs>();

  rectified = false;
  TimeUnit = TimeUnit;
  RouteStatisticType = GarbageManagementStreetDeviceRouteType;
  date = {
    format: Language.YearMonthDay,
    week: false,
    view: {
      min: DateTimePickerView.month,
    },
  };

  private change = {
    deviceId: (simple: SimpleChange) => {
      if (simple) {
        if (this.deviceId) {
          this.args.deviceId = this.deviceId;
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.deviceId(changes['deviceId']);
  }

  ngOnInit(): void {
    if (this.args.deviceId) {
      setTimeout(() => {
        this.load.emit(this.args);
      }, 100);
    }
  }

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
      this.on.search();
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
