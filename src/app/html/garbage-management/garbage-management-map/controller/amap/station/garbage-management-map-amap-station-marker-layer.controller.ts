import { GarbageStationViewModel } from '../../../../../../common/view-model/garbage-station.view-model';
import { MapPointEvent } from '../../../garbage-management-map.model';
import { GarbageManagementMapAMapConfig } from '../garbage-management-map-amap.config';
import { GarbageManagementMapAMapStationMarkerIconController } from './marker/garbage-management-map-amap-station-marker-icon.controller';
import { GarbageManagementMapAMapStationMarkerController } from './marker/garbage-management-map-amap-station-marker.controller';

export class GarbageManagementMapAMapStationMarkerLayerController {
  event = new MapPointEvent<GarbageStationViewModel>();

  constructor(private map: AMap.Map) {
    this.layer = this.init(map);
  }

  private layer: AMap.LabelsLayer;
  private points: GarbageManagementMapAMapStationMarkerController[] = [];

  private init(map: AMap.Map) {
    let layer = new AMap.LabelsLayer({
      collision: false,
      allowCollision: false,
      zooms: GarbageManagementMapAMapConfig.zoom.marker,
    });
    map.add(layer);
    return layer;
  }

  async load(datas: GarbageStationViewModel[]) {
    let markers = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (data.GisPoint) {
        let icon = new GarbageManagementMapAMapStationMarkerIconController(
          data
        );
        let point = new GarbageManagementMapAMapStationMarkerController(
          data,
          icon
        );
        this.regist(point);
        let marker = await point.marker;
        markers.push(marker);
        this.points.push(point);
      }
    }

    this.layer.add(markers);
    return markers;
  }

  private regist(point: GarbageManagementMapAMapStationMarkerController) {
    point.event.mouseover.subscribe((data) => {
      this.event.mouseover.emit(data);
    });
    point.event.mouseout.subscribe((data) => {
      this.event.mouseout.emit(data);
    });
    point.event.click.subscribe((data) => {
      this.event.click.emit(data);
    });
  }

  clear() {
    this.layer.clear();
    this.points = [];
  }
}
