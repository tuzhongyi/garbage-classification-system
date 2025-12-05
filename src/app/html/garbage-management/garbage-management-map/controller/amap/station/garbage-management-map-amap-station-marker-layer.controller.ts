import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
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
  selected?: GarbageStationViewModel;

  private init(map: AMap.Map) {
    let layer = new AMap.LabelsLayer({
      collision: false,
      allowCollision: false,
      zooms: GarbageManagementMapAMapConfig.zoom.marker,
      zIndex: 11,
    });
    map.add(layer);
    return layer;
  }

  load(datas: GarbageStationViewModel[]) {
    let markers = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (ObjectTool.model.GisPoint.valid(data.GisPoint)) {
        let icon = new GarbageManagementMapAMapStationMarkerIconController(
          data
        );
        let point = new GarbageManagementMapAMapStationMarkerController(
          data,
          icon
        );
        this.regist(point);
        let marker = point.marker;
        markers.push(marker);
        this.points.push(point);
      }
    }

    this.layer.add(markers);
    return markers;
  }

  select(id: string) {
    let point = this.points.find((x) => x.id == id);
    if (point) {
      this.on.select(point.data);
    }
  }

  private regist(point: GarbageManagementMapAMapStationMarkerController) {
    point.event.mouseover.subscribe((data) => {
      this.event.mouseover.emit(data);
    });
    point.event.mouseout.subscribe((data) => {
      this.event.mouseout.emit(data);
    });
    point.event.click.subscribe((data) => {
      this.on.select(data);
    });
  }
  private on = {
    select: (data: GarbageStationViewModel) => {
      if (this.selected) {
        if (this.selected.Id != data.Id) {
          this.points.forEach((x) => {
            if (x.id != data.Id) {
              x.blur();
            }
          });
        }
      }

      this.selected = data;
      this.event.click.emit(data);
    },
  };

  clear() {
    this.layer.clear();
    this.points = [];
  }
}
