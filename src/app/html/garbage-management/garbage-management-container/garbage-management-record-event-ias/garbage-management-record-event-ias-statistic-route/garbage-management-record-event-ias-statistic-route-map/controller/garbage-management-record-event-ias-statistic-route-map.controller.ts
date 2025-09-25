import { Injectable } from '@angular/core';
import { IasGpsItem } from '../../../../../../../common/network/model/ias/ias-gps-item.model';
import { GeoTool } from '../../../../../../../common/tools/geo-tool/geo.tool';
import { GarbageManagementRecordEventIasStatisticRouteAMapController } from './amap/garbage-management-record-event-ias-statistic-route-amap.controller';

@Injectable()
export class GarbageManagementRecordEventIasStatisticRouteMapController {
  private amap =
    new GarbageManagementRecordEventIasStatisticRouteAMapController();

  path = {
    load: (datas: IasGpsItem[]) => {
      let positions = datas.map<[number, number]>((x) =>
        GeoTool.point.convert.wgs84.to.gcj02(x.Longitude, x.Latitude)
      );
      this.amap.path.get().then((x) => {
        x.clear();
        x.load(positions);
      });
    },
  };

  map = {
    destroy: () => {
      this.amap.destroy();
    },
  };
}
