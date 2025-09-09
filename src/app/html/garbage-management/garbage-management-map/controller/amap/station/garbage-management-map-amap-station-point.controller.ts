import { EventEmitter } from '@angular/core';
import { EventType } from '../../../../../../common/enum/event-type.enum';
import { StationState } from '../../../../../../common/enum/station-state.enum';
import { ColorTool } from '../../../../../../common/tools/color-tool/color.tool';
import { Flags } from '../../../../../../common/tools/flags';
import { GarbageStationViewModel } from '../../../../../../common/view-model/garbage-station.view-model';
import { GarbageManagementMapAMapConfig } from '../garbage-management-map-amap.config';

export class GarbageManagementMapAMapStationPointController {
  hover = new EventEmitter<GarbageStationViewModel>();
  leave = new EventEmitter<void>();
  eventables: EventType[] = [EventType.GarbageFull, EventType.GarbageDrop];

  constructor(private loca: Loca.Container) {
    this.layer = this.init();
    this.regist();
  }

  private layer: Loca.PointLayer;
  private colors = ['red', 'green', 'yellow'];
  private _hover?: GarbageStationViewModel;
  private handle?: NodeJS.Timeout;
  private style: Loca.PointLayerStyle = {
    radius: (i: number, feature: any) => {
      return 6;
    },
    color: (i: number, feature: any): any => {
      let data = feature.properties as GarbageStationViewModel;
      let flags = new Flags(data.StationState);
      if (flags.contains(StationState.Error)) {
        return ColorTool.station.state.error;
      } else if (
        this.eventables.includes(EventType.GarbageDrop) &&
        data.Statistic &&
        data.Statistic.CurrentGarbageTime
      ) {
        return ColorTool.station.state.garbagedrop;
      } else if (
        this.eventables.includes(EventType.GarbageFull) &&
        flags.contains(StationState.Full)
      ) {
        return ColorTool.station.state.garbagefull;
      } else {
        return ColorTool.station.state.normal;
      }
    },
    borderWidth: 0,
    blurWidth: 4,

    unit: 'px',
  };

  private init() {
    let layer = new Loca.PointLayer({
      blend: 'normal',
      zooms: GarbageManagementMapAMapConfig.zoom.point,
    });
    return layer;
  }
  private regist() {
    GarbageManagementMapAMapConfig.event.mousemoving.subscribe((position) => {
      this.moving(position);
    });
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
      this._hover = item.properties as GarbageStationViewModel;
      this.hover.emit(this._hover);
    }
  }

  load(geo: Loca.GeoJSONSource) {
    this.layer.setSource(geo);
    this.layer.setStyle(this.style);
    this.loca.add(this.layer);
    // this.animation();
  }

  clear() {
    this.layer.remove();
  }
}
