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
import { GarbageManagementStreetDeviceRouteMapController } from './controller/garbage-management-street-device-route-map.controller';
import { GarbageManagementStreetDeviceRouteMapBusiness } from './garbage-management-street-device-route-map.business';

@Component({
  selector: 'howell-garbage-management-street-device-route-map',
  imports: [CommonModule],
  templateUrl: './garbage-management-street-device-route-map.component.html',
  styleUrl: './garbage-management-street-device-route-map.component.less',
  providers: [
    GarbageManagementStreetDeviceRouteMapBusiness,
    GarbageManagementStreetDeviceRouteMapController,
  ],
})
export class GarbageManagementStreetDeviceRouteMapComponent
  implements OnInit, OnDestroy
{
  @Input()
  load?: EventEmitter<GarbageManagementStreetDeviceRouteArgs>;

  constructor(
    private business: GarbageManagementStreetDeviceRouteMapBusiness,
    private controller: GarbageManagementStreetDeviceRouteMapController
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
    load: (args: GarbageManagementStreetDeviceRouteArgs) => {
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
