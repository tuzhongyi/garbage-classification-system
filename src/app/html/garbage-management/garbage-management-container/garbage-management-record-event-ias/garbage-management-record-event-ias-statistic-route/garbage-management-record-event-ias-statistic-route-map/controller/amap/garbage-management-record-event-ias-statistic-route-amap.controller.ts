import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { wait } from '../../../../../../../../common/tools/wait.tools';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { GarbageManagementRecordEventIasStatisticRouteAMapPathController } from './garbage-management-record-event-ias-statistic-route-amap-path.controller';

export class GarbageManagementRecordEventIasStatisticRouteAMapController {
  path =
    new PromiseValue<GarbageManagementRecordEventIasStatisticRouteAMapPathController>();
  constructor() {
    this.init();
  }

  private map = new PromiseValue<AMap.Map>();

  private init() {
    let key = 'route_map_container';
    wait(() => {
      return !!document.getElementById(key);
    })
      .then(() => {
        MapHelper.amap.get(key).then((x) => {
          this.map.set(x);
          this.path.set(
            new GarbageManagementRecordEventIasStatisticRouteAMapPathController(
              x
            )
          );
        });
      })
      .catch(() => {
        console.warn(
          'GarbageManagementRecordEventIasStatisticRouteAMapController init wait error'
        );
      });
  }

  destroy() {
    this.map.get().then((x) => {
      x.destroy();
      this.map.clear();
    });
  }
}
