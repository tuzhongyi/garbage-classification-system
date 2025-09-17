import { EventType } from '../../../../../../common/enum/event-type.enum';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
import { GarbageStationViewModel } from '../../../../../../common/view-model/garbage-station.view-model';
import { GarbageManagementMapAMapConfig } from '../garbage-management-map-amap.config';
import { GarbageManagementMapAMapConverter } from '../garbage-management-map-amap.converter';
import { GarbageManagementMapAMapInfoController } from '../info/garbage-management-map-amap-marker-info.controller';
import { GarbageManagementMapAMapInfo } from '../info/garbage-management-map-amap-marker-info.model';
import { GarbageManagementMapAMapStationMarkerLayerController } from './garbage-management-map-amap-station-marker-layer.controller';
import { GarbageManagementMapAMapStationPointController } from './garbage-management-map-amap-station-point.controller';
import { GarbageManagementMapAMapStationLabelController } from './label/garbage-management-map-amap-station-label.controller';

export class GarbageManagementMapAMapStationController {
  constructor(map: AMap.Map, loca: Loca.Container) {
    this.point = new GarbageManagementMapAMapStationPointController(loca);
    this.label = new GarbageManagementMapAMapStationLabelController(map);
    this.marker = new GarbageManagementMapAMapStationMarkerLayerController(map);
    this.info = new GarbageManagementMapAMapInfoController(
      map,
      GarbageManagementMapAMapConfig.zoom.marker
    );
    this.regist();
  }

  private point: GarbageManagementMapAMapStationPointController;
  private label: GarbageManagementMapAMapStationLabelController;
  private marker: GarbageManagementMapAMapStationMarkerLayerController;
  private info: GarbageManagementMapAMapInfoController;

  private regist() {
    this.point.hover.subscribe((station) => {
      if (
        ObjectTool.model.GisPoint.valid(station.GisPoint) &&
        station.GisPoint
      ) {
        this.label.open(station.Name, [
          station.GisPoint.Longitude,
          station.GisPoint.Latitude,
        ]);
      }
    });
    this.point.leave.subscribe(() => {
      this.label.close();
    });
    this.marker.event.mouseover.subscribe((station) => {
      let info: GarbageManagementMapAMapInfo = {
        Name: station.Name,
        Location: ObjectTool.model.GisPoint.to(station.GisPoint),
      };
      this.info.add(info);
    });
    this.marker.event.mouseout.subscribe((station) => {
      this.info.remove();
    });
  }

  load(datas: GarbageStationViewModel[]) {
    let geo = GarbageManagementMapAMapConverter.geo.point.array(datas);
    let source = new Loca.GeoJSONSource({ data: geo });
    this.point.load(source);
    this.marker.load(datas);
  }

  clear() {
    this.point.clear();
    this.marker.clear();
  }

  set = {
    eventable: (types: EventType[]) => {
      this.point.eventables = types;
    },
  };
}
