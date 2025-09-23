import { IasEventRecord } from '../../../../../../common/network/model/ias/ias-event-record.model';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';

import { MapPointEvent } from '../../../garbage-management-map.model';
import { GarbageManagementMapAMapRecordMarkerIconController } from './marker/garbage-management-map-amap-record-marker-icon.controller';
import { GarbageManagementMapAMapRecordMarkerController } from './marker/garbage-management-map-amap-record-marker.controller';

export class GarbageManagementMapAMapRecordMarkerLayerController {
  event = new MapPointEvent<IasEventRecord>();

  constructor(private map: AMap.Map) {
    this.layer = this.init(map);
  }

  private layer: AMap.LabelsLayer;
  private points: GarbageManagementMapAMapRecordMarkerController[] = [];

  private init(map: AMap.Map) {
    let layer = new AMap.LabelsLayer({
      collision: false,
      allowCollision: false,
      zooms: [0, 50],
    });
    map.add(layer);
    return layer;
  }

  load(datas: IasEventRecord[]) {
    let markers = [];
    let icon = new GarbageManagementMapAMapRecordMarkerIconController();
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (ObjectTool.model.GisPoint.valid(data.Location)) {
        let point = new GarbageManagementMapAMapRecordMarkerController(
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

  private regist(point: GarbageManagementMapAMapRecordMarkerController) {
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
    this.points = [];
  }
}
