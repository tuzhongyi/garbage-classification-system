import { MapDivision } from '../../../../../../common/network/request/map/map-division.model';
import {
  GarbageManagementMapAMapConfigController as Config,
  GarbageManagementMapAMapConfigController,
} from '../garbage-management-map-amap.config';

export class GarbageManagementMapAMapDivisionPolygonController {
  constructor(private loca: Loca.Container) {
    this.layer = this.init();
    this.regist();
  }

  private layer: Loca.PolygonLayer;
  private hover?: MapDivision;
  private handle?: NodeJS.Timeout;

  private style = {
    topColor: (index: number, feature: any) => {
      if (this.hover) {
        if (this.hover.id === feature.properties.id) {
          return 'rgba(0,246,255, 0.8)';
        }
      }
      return 'rgba(0,246,255, 0.3)';
    },
    sideTopColor: Config.color.border.division,
    sideBottomColor: Config.color.border.division,
    height: Config.height,
    altitude: 0,
  };

  private init() {
    var layer = new Loca.PolygonLayer({
      zIndex: 120,
      opacity: 1,
      cullface: 'none',
      shininess: 1,
      hasSide: false,
      blockHide: false,
    });
    return layer;
  }

  private regist() {
    GarbageManagementMapAMapConfigController.event.mousemoving.subscribe(
      (position) => {
        this.moving(position);
      }
    );
  }

  private animation() {
    if (!this.handle) {
      this.handle = setInterval(() => {
        this.layer.setStyle(this.style);
      }, 1);
    }
  }

  private moving(position: [number, number]) {
    if (this.hover) {
      this.hover = undefined;
    }
    let item = this.layer.queryFeature(position);
    if (item) {
      this.hover = item.properties as MapDivision;
    }
  }

  load(data: Loca.GeoJSONSource) {
    this.layer.setSource(data);
    this.layer.setStyle(this.style);
    this.loca.add(this.layer);
    this.animation();
  }
}
