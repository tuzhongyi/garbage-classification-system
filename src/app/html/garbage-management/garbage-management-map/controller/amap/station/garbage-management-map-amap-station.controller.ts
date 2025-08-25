import { GarbageStation } from '../../../../../../common/network/model/garbage-station/garbage-station.model';
import { GarbageManagementMapAMapConverter } from '../garbage-management-map-amap.converter';
import { GarbageManagementMapAMapStationPointController } from './garbage-management-map-amap-station-point.controller';
import { GarbageManagementMapAMapStationLabelController } from './label/garbage-management-map-amap-station-label.controller';

export class GarbageManagementMapAMapStationController {
  constructor(map: AMap.Map, loca: Loca.Container) {
    this.point = new GarbageManagementMapAMapStationPointController(loca);
    this.label = new GarbageManagementMapAMapStationLabelController(map);
    this.regist();
  }

  private point: GarbageManagementMapAMapStationPointController;
  private label: GarbageManagementMapAMapStationLabelController;

  private converter = new GarbageManagementMapAMapConverter();

  private regist() {
    this.point.hover.subscribe((station) => {
      if (station.GisPoint) {
        this.label.open(station.Name, [
          station.GisPoint.Longitude,
          station.GisPoint.Latitude,
        ]);
      }
    });
    this.point.leave.subscribe(() => {
      this.label.close();
    });
  }

  load(datas: GarbageStation[]) {
    let geo = this.converter.geo.point.array(datas);
    let source = new Loca.GeoJSONSource({ data: geo });
    this.point.load(source);
  }
}
