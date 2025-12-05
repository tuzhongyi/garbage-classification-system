import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GarbageManagementStreetDeviceRouteArgs } from '../garbage-management-street-device-route.model';
import { GarbageManagementStreetDeviceRouteInfoBusiness } from './garbage-management-street-device-route-info.business';
import { IGarbageManagementStreetDeviceRouteInfo } from './garbage-management-street-device-route-info.model';

@Component({
  selector: 'howell-garbage-management-street-device-route-info',
  imports: [CommonModule],
  templateUrl: './garbage-management-street-device-route-info.component.html',
  styleUrl: './garbage-management-street-device-route-info.component.less',
  providers: [GarbageManagementStreetDeviceRouteInfoBusiness],
})
export class GarbageManagementStreetDeviceRouteInfoComponent
  implements OnInit, OnDestroy
{
  @Input()
  load?: EventEmitter<GarbageManagementStreetDeviceRouteArgs>;

  constructor(
    private business: GarbageManagementStreetDeviceRouteInfoBusiness
  ) {}
  data?: IGarbageManagementStreetDeviceRouteInfo;

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
    load: (args: GarbageManagementStreetDeviceRouteArgs) => {
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
