import { GarbageManagementMapAMapController } from './amap/garbage-management-map-amap.controller';

export class GarbageManagementMapIasHeatmapController {
  constructor(private amap: GarbageManagementMapAMapController) {}

  load(datas: [number, number][]) {
    this.amap.heatmap.get().then((x) => {
      x.clear();
      x.load(datas);
    });
  }
  clear() {
    this.amap.heatmap.get().then((x) => {
      x.clear();
    });
  }
}
