import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceRoutesStatistic } from '../../../../../common/network/model/ias/device-routes-statistic.model';
import { GarbageManagementStreetDeviceRouteChartComponent } from '../garbage-management-street-device-route-chart/garbage-management-street-device-route-chart.component';
import {
  GarbageManagementStreetDeviceRouteArgs,
  GarbageManagementStreetDeviceRouteType,
} from '../garbage-management-street-device-route.model';
import { GarbageManagementStreetDeviceRouteChartContainerBusiness } from './garbage-management-street-device-route-chart-container.business';

@Component({
  selector: 'howell-garbage-management-street-device-route-chart-container',
  imports: [CommonModule, GarbageManagementStreetDeviceRouteChartComponent],
  templateUrl:
    './garbage-management-street-device-route-chart-container.component.html',
  styleUrl:
    './garbage-management-street-device-route-chart-container.component.less',
  providers: [GarbageManagementStreetDeviceRouteChartContainerBusiness],
})
export class GarbageManagementStreetDeviceRouteChartContainerComponent
  implements OnInit, OnDestroy
{
  @Input()
  load?: EventEmitter<GarbageManagementStreetDeviceRouteArgs>;

  constructor(
    private business: GarbageManagementStreetDeviceRouteChartContainerBusiness
  ) {}

  args = new GarbageManagementStreetDeviceRouteArgs();
  datas: DeviceRoutesStatistic[] = [];
  loading = false;
  loaded = false;
  RouteStatisticType = GarbageManagementStreetDeviceRouteType;

  private subscription = new Subscription();
  private regist() {
    if (this.load) {
      let sub = this.load.subscribe((x) => {
        this.loaded = true;
        this.args = x;
        this.data.load(x);
      });
      this.subscription.add(sub);
    }
  }

  private data = {
    load: (args: GarbageManagementStreetDeviceRouteArgs) => {
      this.loading = true;
      this.business
        .load(args.deviceId, args.unit, args.date)
        .then((x) => {
          this.datas = x;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  };

  ngOnInit(): void {
    this.regist();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
