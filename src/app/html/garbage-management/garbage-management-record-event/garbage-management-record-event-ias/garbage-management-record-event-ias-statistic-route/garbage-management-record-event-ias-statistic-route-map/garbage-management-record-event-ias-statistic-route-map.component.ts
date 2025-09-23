import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GarbageManagementRecordEventIasStatisticRouteArgs } from '../garbage-management-record-event-ias-statistic-route.model';
import { GarbageManagementRecordEventIasStatisticRouteMapController } from './controller/garbage-management-record-event-ias-statistic-route-map.controller';
import { GarbageManagementRecordEventIasStatisticRouteMapBusiness } from './garbage-management-record-event-ias-statistic-route-map.business';

@Component({
  selector: 'howell-garbage-management-record-event-ias-statistic-route-map',
  imports: [CommonModule],
  templateUrl:
    './garbage-management-record-event-ias-statistic-route-map.component.html',
  styleUrl:
    './garbage-management-record-event-ias-statistic-route-map.component.less',
  providers: [
    GarbageManagementRecordEventIasStatisticRouteMapBusiness,
    GarbageManagementRecordEventIasStatisticRouteMapController,
  ],
})
export class GarbageManagementRecordEventIasStatisticRouteMapComponent
  implements OnInit, OnDestroy
{
  @Input()
  load?: EventEmitter<GarbageManagementRecordEventIasStatisticRouteArgs>;

  constructor(
    private business: GarbageManagementRecordEventIasStatisticRouteMapBusiness,
    private controller: GarbageManagementRecordEventIasStatisticRouteMapController
  ) {}

  loaded = false;
  loading = false;
  private subscription = new Subscription();
  private regist() {
    if (this.load) {
      let sub = this.load.subscribe((x) => {
        this.data.load(x);
      });
      this.subscription.add(sub);
    }
  }

  private data = {
    load: (args: GarbageManagementRecordEventIasStatisticRouteArgs) => {
      this.loading = true;
      this.business
        .load(args)
        .then((x) => {
          this.controller.path.load(x);
        })
        .finally(() => {
          this.loading = false;
          this.loaded = true;
        });
    },
  };

  ngOnInit(): void {
    this.regist();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.map.destroy();
  }
}
