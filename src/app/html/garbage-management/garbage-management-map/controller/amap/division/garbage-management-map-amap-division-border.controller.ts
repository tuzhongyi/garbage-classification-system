import { GarbageManagementMapAMapConfig as Config } from '../garbage-management-map-amap.config';

export class GarbageManagementMapAMapDivisionBorderController {
  constructor(private loca: Loca.Container) {
    this.layer = this.init();
  }

  private layer: Loca.LineLayer;
  selected?: string;
  private style = {
    color: (index: number, feature: any) => {
      if (this.selected) {
        if (this.selected === feature.properties.id) {
          return 'rgba(56, 186, 255, 1)';
        }
      }
      return '#80aaff';
    },
    borderColor: Config.color.border.division,
    borderWidth: 0,
    lineWidth: (index: number, feature: any) => {
      if (this.selected) {
        if (this.selected === feature.properties.id) {
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
    this.selected = id;
    this.layer.setStyle(this.style);
  }
  out() {
    this.selected = undefined;
    this.layer.setStyle(this.style);
  }
}
