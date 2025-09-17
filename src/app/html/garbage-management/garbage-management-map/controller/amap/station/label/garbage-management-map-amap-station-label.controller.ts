import { GarbageManagementMapAMapConfig } from '../../garbage-management-map-amap.config';

export class GarbageManagementMapAMapStationLabelController {
  constructor(private map: AMap.Map) {
    this.info = this.init();
  }

  private info: AMap.InfoWindow;

  private init() {
    let info = new AMap.InfoWindow({
      anchor: 'bottom-center',
      content: '',
      zooms: GarbageManagementMapAMapConfig.zoom.point,
    });
    return info;
  }

  open(name: string, position: [number, number]) {
    this.info.setContent(name);
    this.info.open(this.map, position);
  }

  close() {
    this.info.close();
  }
}
