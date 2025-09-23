import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceRoutesStatistic } from '../../../../../../common/network/model/ias/device-routes-statistic.model';
import { GarbageManagementRecordEventIasStatisticRouteChartComponent } from '../garbage-management-record-event-ias-statistic-route-chart/garbage-management-record-event-ias-statistic-route-chart.component';
import {
  GarbageManagementRecordEventIasStatisticRouteArgs,
  GarbageManagementRecordEventIasStatisticRouteType,
} from '../garbage-management-record-event-ias-statistic-route.model';
import { GarbageManagementRecordEventIasStatisticRouteChartContainerBusiness } from './garbage-management-record-event-ias-statistic-route-chart-container.business';

@Component({
  selector:
    'howell-garbage-management-record-event-ias-statistic-route-chart-container',
  imports: [
    CommonModule,
    GarbageManagementRecordEventIasStatisticRouteChartComponent,
  ],
  templateUrl:
    './garbage-management-record-event-ias-statistic-route-chart-container.component.html',
  styleUrl:
    './garbage-management-record-event-ias-statistic-route-chart-container.component.less',
  providers: [
    GarbageManagementRecordEventIasStatisticRouteChartContainerBusiness,
  ],
})
export class GarbageManagementRecordEventIasStatisticRouteChartContainerComponent
  implements OnInit, OnDestroy
{
  @Input()
  load?: EventEmitter<GarbageManagementRecordEventIasStatisticRouteArgs>;

  constructor(
    private business: GarbageManagementRecordEventIasStatisticRouteChartContainerBusiness
  ) {}

  args = new GarbageManagementRecordEventIasStatisticRouteArgs();
  datas: DeviceRoutesStatistic[] = [];
  loading = false;
  loaded = false;
  RouteStatisticType = GarbageManagementRecordEventIasStatisticRouteType;

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
    load: (args: GarbageManagementRecordEventIasStatisticRouteArgs) => {
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
