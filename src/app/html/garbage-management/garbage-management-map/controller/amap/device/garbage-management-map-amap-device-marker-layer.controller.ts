import { IasDevice } from '../../../../../../common/network/model/ias/ias-device.model';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
import { MapPointEvent } from '../../../garbage-management-map.model';
import { GarbageManagementMapAMapDeviceMarkerIconController } from './marker/garbage-management-map-amap-device-marker-icon.controller';
import { GarbageManagementMapAMapDeviceMarkerController } from './marker/garbage-management-map-amap-device-marker.controller';

export class GarbageManagementMapAMapDeviceMarkerLayerController {
  event = new MapPointEvent<IasDevice>();

  constructor(private map: AMap.Map) {
    this.layer = this.init(map);
  }

  private layer: AMap.LabelsLayer;
  private points: GarbageManagementMapAMapDeviceMarkerController[] = [];

  private init(map: AMap.Map) {
    let layer = new AMap.LabelsLayer({
      collision: false,
      allowCollision: false,
    });
    map.add(layer);
    return layer;
  }

  load(datas: IasDevice[]) {
    let markers = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (ObjectTool.model.GisPoint.valid(data.Location)) {
        let icon = new GarbageManagementMapAMapDeviceMarkerIconController();
        let point = new GarbageManagementMapAMapDeviceMarkerController(
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

  private regist(point: GarbageManagementMapAMapDeviceMarkerController) {
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
