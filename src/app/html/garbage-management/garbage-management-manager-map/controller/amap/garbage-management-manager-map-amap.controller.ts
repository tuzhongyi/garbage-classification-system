import { MapHelper } from '../../../../../common/helper/map/map.helper';
import { IasEventRecord } from '../../../../../common/network/model/ias/ias-event-record.model';
import { GeoTool } from '../../../../../common/tools/geo-tool/geo.tool';
import { PathTool } from '../../../../../common/tools/path-tool/path.tool';
import { PromiseValue } from '../../../../../common/view-models/value.promise';

export class GarbageManagementManagerMapAMapController {
  constructor() {
    this.init();
  }

  private map = new PromiseValue<AMap.Map>();

  private init() {
    let key = 'garbage_management_manager_map_container';
    MapHelper.amap.get(key).then((x) => {
      this.map.set(x);
    });
  }

  load(data: IasEventRecord) {
    this.map.get().then((map) => {
      if (data.Location) {
        let position = GeoTool.point.convert.wgs84.to.gcj02(
          data.Location.Longitude,
          data.Location.Latitude
        );
        let path = data.IsTimeout
          ? PathTool.map.marker.ias.red
          : PathTool.map.marker.ias.orange;
        var marker = new AMap.Marker({
          position: position,
          icon: path,
          anchor: 'center',
        });
        map.add(marker);
        map.setFitView(undefined, true);
      }
    });
  }

  destroy() {
    this.map.get().then((x) => {
      x.destroy();
      this.map.clear();
    });
  }
}
