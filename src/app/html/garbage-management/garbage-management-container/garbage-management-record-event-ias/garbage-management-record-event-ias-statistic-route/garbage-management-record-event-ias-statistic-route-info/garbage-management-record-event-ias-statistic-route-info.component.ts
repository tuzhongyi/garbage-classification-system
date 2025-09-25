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
import { GarbageManagementRecordEventIasStatisticRouteInfoBusiness } from './garbage-management-record-event-ias-statistic-route-info.business';
import { IGarbageManagementRecordEventIasStatisticRouteInfo } from './garbage-management-record-event-ias-statistic-route-info.model';

@Component({
  selector: 'howell-garbage-management-record-event-ias-statistic-route-info',
  imports: [CommonModule],
  templateUrl:
    './garbage-management-record-event-ias-statistic-route-info.component.html',
  styleUrl:
    './garbage-management-record-event-ias-statistic-route-info.component.less',
  providers: [GarbageManagementRecordEventIasStatisticRouteInfoBusiness],
})
export class GarbageManagementRecordEventIasStatisticRouteInfoComponent
  implements OnInit, OnDestroy
{
  @Input()
  load?: EventEmitter<GarbageManagementRecordEventIasStatisticRouteArgs>;

  constructor(
    private business: GarbageManagementRecordEventIasStatisticRouteInfoBusiness
  ) {}
  data?: IGarbageManagementRecordEventIasStatisticRouteInfo;

  private subscription = new Subscription();
  private regist() {
    if (this.load) {
      let sub = this.load.subscribe((x) => {
        this._data.load(x);
      });
      this.subscription.add(sub);
    }
  }

  private _data = {
    load: (args: GarbageManagementRecordEventIasStatisticRouteArgs) => {
      this.business.load(args).then((x) => {
        this.data = x;
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
