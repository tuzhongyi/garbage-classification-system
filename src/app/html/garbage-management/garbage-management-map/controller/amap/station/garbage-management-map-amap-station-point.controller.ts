import { EventEmitter } from '@angular/core';
import { StationState } from '../../../../../../common/enum/station-state.enum';
import { GarbageStation } from '../../../../../../common/network/model/garbage-station/garbage-station.model';
import { Flags } from '../../../../../../common/tools/flags';
import { GarbageManagementMapAMapConfigController } from '../garbage-management-map-amap.config';

export class GarbageManagementMapAMapStationPointController {
  hover = new EventEmitter<GarbageStation>();
  leave = new EventEmitter<void>();

  constructor(private loca: Loca.Container) {
    this.layer = this.init();
    this.regist();
  }

  private layer: Loca.PointLayer;
  private colors = ['red', 'green', 'yellow'];
  private _hover?: GarbageStation;
  private handle?: NodeJS.Timeout;
  private style: Loca.PointLayerStyle = {
    radius: (i: number, feature: any) => {
      return 6;
    },
    color: (i: number, feature: any): any => {
      let data = feature.properties as GarbageStation;
      let flags = new Flags(data.StationState);
      if (flags.contains(StationState.Error)) {
        return 'red';
      } else if (flags.contains(StationState.Full)) {
        return 'yellow';
      } else {
        return 'green';
      }
    },
    borderWidth: 0,
    blurWidth: 4,

    unit: 'px',
  };

  private init() {
    let layer = new Loca.PointLayer({
      blend: 'normal',
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
    if (this._hover) {
      this._hover = undefined;
      this.leave.emit();
    }
    let item = this.layer.queryFeature(position);
    if (item) {
      this._hover = item.properties as GarbageStation;
      this.hover.emit(this._hover);
    }
  }

  load(geo: Loca.GeoJSONSource) {
    this.layer.setSource(geo);
    this.layer.setStyle(this.style);
    this.loca.add(this.layer);
    // this.animation();
  }
}
