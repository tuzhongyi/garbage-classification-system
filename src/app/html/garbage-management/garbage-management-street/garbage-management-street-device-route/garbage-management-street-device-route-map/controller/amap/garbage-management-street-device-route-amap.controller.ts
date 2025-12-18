import { MapHelper } from '../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';
import { GarbageManagementStreetDeviceRouteAMapPathController } from './garbage-management-street-device-route-amap-path.controller';

export class GarbageManagementStreetDeviceRouteAMapController {
  path: GarbageManagementStreetDeviceRouteAMapPathController[] = [];

  constructor() {
    this.init();
  }

  map = new PromiseValue<AMap.Map>();

  private init() {
    let key = 'route_map_container';
    MapHelper.amap.get(key).then((x) => {
      x.setFeatures(['bg', 'road', 'point']);
      this.map.set(x);
    });
  }

  destroy() {
    this.map.get().then((x) => {
      x.destroy();
      this.map.clear();
    });
  }
}
