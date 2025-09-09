import { GarbageManagementMapAMapConfig as Config } from '../garbage-management-map-amap.config';

export class GarbageManagementMapAMapDivisionBorderController {
  constructor(private loca: Loca.Container) {
    this.layer = this.init();
  }

  private layer: Loca.LineLayer;
  hover?: string;
  private style = {
    color: (index: number, feature: any) => {
      if (this.hover) {
        if (this.hover === feature.properties.id) {
          return 'rgba(40, 108, 241, 0.3)';
        }
      }
      return '#80aaff';
    },
    borderColor: Config.color.border.division,
    borderWidth: 0,
    lineWidth: (index: number, feature: any) => {
      if (this.hover) {
        if (this.hover === feature.properties.id) {
          return 5;
        }
      }
      return 2;
    },
    altitude: Config.height,
  };

  private init() {
    var layer = new Loca.LineLayer({});
    return layer;
  }

  load(data: Loca.GeoJSONSource) {
    this.layer.setSource(data);
    this.layer.setStyle(this.style);
    this.loca.add(this.layer);
  }

  over(id: string) {
    this.hover = id;
    this.layer.setStyle(this.style);
  }
  out() {
    this.hover = undefined;
    this.layer.setStyle(this.style);
  }
}
