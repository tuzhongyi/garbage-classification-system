import { IasDevice } from '../../../../../../../../common/network/model/ias/ias-device.model';
import { IasGpsItem } from '../../../../../../../../common/network/model/ias/ias-gps-item.model';
import { ObjectTool } from '../../../../../../../../common/tools/object-tool/object.tool';
import { MapPointEvent } from '../../../../../../garbage-management-map/garbage-management-map.model';
import { GarbageManagementStreetDeviceRouteAMapDeviceIconController } from './garbage-management-street-device-route-amap-device-icon.controller';
import { GarbageManagementStreetDeviceRouteAMapDeviceMarkerController } from './garbage-management-street-device-route-amap-device-marker.controller';

export class GarbageManagementStreetDeviceRouteAMapDeviceController {
  event = new MapPointEvent<IasDevice>();

  constructor(private map: AMap.Map) {
    this.layer = this.init(map);
  }

  private layer: AMap.LabelsLayer;
  private point?: GarbageManagementStreetDeviceRouteAMapDeviceMarkerController;

  private init(map: AMap.Map) {
    let layer = new AMap.LabelsLayer({
      collision: false,
      allowCollision: false,
    });
    map.add(layer);
    return layer;
  }

  load(data: IasDevice) {
    let markers = [];

    if (ObjectTool.model.GisPoint.valid(data.Location)) {
      let icon =
        new GarbageManagementStreetDeviceRouteAMapDeviceIconController();
      this.point =
        new GarbageManagementStreetDeviceRouteAMapDeviceMarkerController(
          data,
          icon
        );
      this.regist(this.point);
      let marker = this.point.marker;
      markers.push(marker);
    }

    this.layer.add(markers);
    return markers;
  }

  private regist(
    point: GarbageManagementStreetDeviceRouteAMapDeviceMarkerController
  ) {
    point.event.mouseover.subscribe((data) => {
      this.event.mouseover.emit(data);
    });
    point.event.mouseout.subscribe((data) => {
      this.event.mouseout.emit(data);
    });
    point.event.click.subscribe((data) => {
      this.event.click.emit(data);
    });
    point.event.dblclick.subscribe((data) => {
      this.event.dblclick.emit(data);
    });
  }

  clear() {
    this.layer.clear();
    this.point = undefined;
  }

  set = {
    position: (data: IasGpsItem) => {
      if (this.point) {
        this.point.set.position(data);
      }
    },
  };
}
