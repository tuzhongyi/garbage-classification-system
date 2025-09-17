import { EventEmitter } from '@angular/core';
import { MapDivision } from '../../../../../../common/network/request/map/map-division.model';
import { GarbageManagementMapAMapConfig as Config } from '../garbage-management-map-amap.config';

export class GarbageManagementMapAMapDivisionPolygonController {
  event = {
    over: new EventEmitter<string>(),
    out: new EventEmitter<void>(),
  };

  constructor(private loca: Loca.Container) {
    this.layer = this.init();
    this.regist();
  }

  private layer: Loca.PolygonLayer;
  private selected?: string;
  private handle?: NodeJS.Timeout;

  private style = {
    topColor: (index: number, feature: any) => {
      if (this.selected) {
        if (this.selected === feature.properties.id) {
          return 'rgba(56, 186, 255, 0.5)';
        }
      }
      return 'rgba(56, 186, 255, 0.1)';
    },
    sideTopColor: 'rgba(40, 108, 241, 1)',
    sideBottomColor: 'rgba(40, 108, 241, 1)',
    height: Config.height,
    altitude: 0,
  };

  private init() {
    var layer = new Loca.PolygonLayer({
      zIndex: 10,
      opacity: 1,
      cullface: 'none',
      shininess: 1,
      hasSide: false,
      blockHide: false,
      depth: false,
    });
    return layer;
  }

  private regist() {
    // GarbageManagementMapAMapConfig.event.mousemoving.subscribe((position) => {
    //   this.moving(position);
    // });
  }

  private animation() {
    if (!this.handle) {
      this.handle = setInterval(() => {
        this.layer.setStyle(this.style);
      }, 1);
    }
  }

  private moving(position: [number, number]) {
    let item = this.layer.queryFeature(position);
    if (item) {
      let division = item.properties as MapDivision;
      if (this.selected) {
        if (this.selected != division.id) {
          this.event.out.emit();
        }
      }
      this.selected = division.id;
      this.event.over.emit(this.selected);
    } else if (this.selected) {
      this.event.out.emit();
      this.selected = undefined;
    }
  }

  load(data: Loca.GeoJSONSource) {
    this.layer.setSource(data);
    this.layer.setStyle(this.style);
    this.loca.add(this.layer);
    this.animation();
  }

  select(id: string) {
    this.selected = id;
  }
}
