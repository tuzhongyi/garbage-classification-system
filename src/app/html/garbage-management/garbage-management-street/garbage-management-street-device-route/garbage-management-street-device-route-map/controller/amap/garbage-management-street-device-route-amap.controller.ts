import { MapHelper } from '../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';
import { GarbageManagementStreetDeviceRouteAMapDeviceController } from './device/garbage-management-street-device-route-amap-device.controller';
import { GarbageManagementStreetDeviceRouteAMapPathController } from './garbage-management-street-device-route-amap-path.controller';

export class GarbageManagementStreetDeviceRouteAMapController {
  path: GarbageManagementStreetDeviceRouteAMapPathController[] = [];
  device =
    new PromiseValue<GarbageManagementStreetDeviceRouteAMapDeviceController>();
  constructor() {
    this.init();
  }

  map = new PromiseValue<AMap.Map>();

  private init() {
    let key = 'route_map_container';
    MapHelper.amap.get(key, { viewMode: '2D' }).then((x) => {
      x.setFeatures(['bg', 'road', 'point']);
      this.map.set(x);

      let device = new GarbageManagementStreetDeviceRouteAMapDeviceController(
        x
      );
      this.device.set(device);
    });
  }

  async destroy() {
    let device = await this.device.get();
    device.clear();

    let map = await this.map.get();
    map.destroy();
    this.map.clear();
  }
}
