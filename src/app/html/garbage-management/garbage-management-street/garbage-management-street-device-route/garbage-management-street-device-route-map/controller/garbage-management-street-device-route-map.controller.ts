import { Injectable } from '@angular/core';
import { IasGpsItem } from '../../../../../../common/network/model/ias/ias-gps-item.model';
import { GeoTool } from '../../../../../../common/tools/geo-tool/geo.tool';
import { GarbageManagementStreetDeviceRouteAMapPathController } from './amap/garbage-management-street-device-route-amap-path.controller';
import { GarbageManagementStreetDeviceRouteAMapController } from './amap/garbage-management-street-device-route-amap.controller';

@Injectable()
export class GarbageManagementStreetDeviceRouteMapController {
  private amap = new GarbageManagementStreetDeviceRouteAMapController();

  private controller = {
    path: [] as GarbageManagementStreetDeviceRouteAMapPathController[],
  };

  path = {
    load: async (datas: IasGpsItem[][]) => {
      let positions = datas.map<[number, number][]>((x) =>
        x.map((y) =>
          GeoTool.point.convert.wgs84.to.gcj02(y.Longitude, y.Latitude)
        )
      );

      let map = await this.amap.map.get();

      let polylines = positions
        .map((paths, i) => {
          let path = new GarbageManagementStreetDeviceRouteAMapPathController(
            map,
            i
          );
          this.controller.path.push(path);
          return path.load(paths)!;
        })
        .filter((x) => !!x);

      map.setFitView(polylines, true);
      setTimeout(() => {
        map.setFitView(polylines, true);
      }, 2 * 1000);
    },
    clear: () => {
      this.controller.path.forEach((x) => {
        x.clear();
      });
      this.controller.path = [];
    },
  };

  map = {
    destroy: () => {
      this.amap.destroy();
      this.path.clear();
    },
  };
}
