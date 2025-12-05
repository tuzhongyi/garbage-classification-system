import { EventEmitter } from '@angular/core';
import { EventType } from '../../../../common/enum/event-type.enum';
import { GarbageStationViewModel } from '../../../../common/view-model/garbage-station.view-model';
import { GarbageManagementMapAMapController } from './amap/garbage-management-map-amap.controller';

export class GarbageManagementMapStationController {
  event = {
    camera: new EventEmitter<GarbageStationViewModel>(),
    mixedinto: new EventEmitter<GarbageStationViewModel>(),
    illegaldrop: new EventEmitter<GarbageStationViewModel>(),
    illegalvehicle: new EventEmitter<GarbageStationViewModel>(),
    garbagefull: new EventEmitter<GarbageStationViewModel>(),
    garbagedrop: new EventEmitter<GarbageStationViewModel>(),
    error: new EventEmitter<GarbageStationViewModel>(),
  };

  constructor(private amap: GarbageManagementMapAMapController) {
    this.regist();
  }

  private regist() {
    this.amap.station.get().then((x) => {
      x.event.camera.subscribe((data) => {
        this.event.camera.emit(data);
      });
      x.event.mixedinto.subscribe((data) => {
        this.event.mixedinto.emit(data);
      });
      x.event.illegaldrop.subscribe((data) => {
        this.event.illegaldrop.emit(data);
      });
      x.event.illegalvehicle.subscribe((data) => {
        this.event.illegalvehicle.emit(data);
      });
      x.event.garbagefull.subscribe((data) => {
        this.event.garbagefull.emit(data);
      });
      x.event.garbagedrop.subscribe((data) => {
        this.event.garbagedrop.emit(data);
      });
      x.event.error.subscribe((data) => {
        this.event.error.emit(data);
      });
    });
  }

  load(datas: GarbageStationViewModel[]) {
    this.amap.station.get().then((x) => {
      x.clear();
      x.load(datas);
    });
  }
  clear() {
    this.amap.station.get().then((x) => {
      x.clear();
    });
  }
  eventable(types: EventType[]) {
    this.amap.station.get().then((x) => {
      x.set.eventable(types);
    });
  }
  blur() {
    this.amap.station.get().then((x) => {
      x.set.blur();
    });
  }
  select(id: string) {
    this.amap.station.get().then((x) => {
      x.select(id);
    });
  }
}
