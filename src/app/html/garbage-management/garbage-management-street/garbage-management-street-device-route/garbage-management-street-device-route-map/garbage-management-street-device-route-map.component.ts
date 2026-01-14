import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IasGpsItem } from '../../../../../common/network/model/ias/ias-gps-item.model';
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
  implements OnInit, OnChanges, OnDestroy
{
  @Input()
  load?: EventEmitter<GarbageManagementStreetDeviceRouteArgs>;
  @Input() rectified = false;
  @Output('loaded') _loaded = new EventEmitter<IasGpsItem[]>();
  @Input() gps?: IasGpsItem;

  constructor(
    private business: GarbageManagementStreetDeviceRouteMapBusiness,
    private controller: GarbageManagementStreetDeviceRouteMapController
  ) {}

  loaded = false;
  loading = false;
  private args?: GarbageManagementStreetDeviceRouteArgs;
  private subscription = new Subscription();
  private regist() {
    if (this.load) {
      let sub = this.load.subscribe((x) => {
        this.data.device(x);
        this.data.load(x, this.rectified);
      });
      this.subscription.add(sub);
    }
  }

  private data = {
    load: (
      args: GarbageManagementStreetDeviceRouteArgs,
      rectified: boolean
    ) => {
      this.args = args;
      this.loading = true;
      let datas: IasGpsItem[] = [];
      this.business
        .load(args, rectified)
        .then((x) => {
          this.controller.path.clear();
          this.controller.path.load(x);
          for (let i = 0; i < x.length; i++) {
            datas = [...datas, ...x[i]];
          }
        })
        .finally(() => {
          this.loading = false;
          this.loaded = true;
          this._loaded.emit(datas);
        });
    },
    device: (args: GarbageManagementStreetDeviceRouteArgs) => {
      this.business.device(args.deviceId).then((x) => {
        this.controller.device.load(x);
      });
    },
  };

  private change = {
    rectified: (simple: SimpleChange) => {
      if (simple) {
        if (this.args) {
          this.data.load(this.args, this.rectified);
        }
      }
    },
    gps: (simple: SimpleChange) => {
      if (simple) {
        if (this.gps) {
          this.controller.device.set.position(this.gps);
        }
      }
    },
  };

  ngOnInit(): void {
    this.regist();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.rectified(changes['rectified']);
    this.change.gps(changes['gps']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.map.destroy();
  }
}
