import { EventEmitter, Injectable } from '@angular/core';
import { EventType } from '../../../../common/enum/event-type.enum';
import { IasDevice } from '../../../../common/network/model/ias/ias-device.model';
import { IasEventRecord } from '../../../../common/network/model/ias/ias-event-record.model';
import { MapDivision } from '../../../../common/network/request/map/map-division.model';
import { GarbageStationViewModel } from '../../../../common/view-model/garbage-station.view-model';
import { GarbageManagementMapAMapController } from './amap/garbage-management-map-amap.controller';

@Injectable()
export class GarbageManagementMapController {
  constructor(private amap: GarbageManagementMapAMapController) {
    this.regist();
  }

  private regist() {
    this.amap.record.get().then((x) => {
      x.event.dblclick.subscribe((data) => {
        this.record.event.dblclick.emit(data);
      });
    });
    this.amap.station.get().then((x) => {
      x.event.camera.subscribe((data) => {
        this.station.event.camera.emit(data);
      });
      x.event.mixedinto.subscribe((data) => {
        this.station.event.mixedinto.emit(data);
      });
      x.event.illegaldrop.subscribe((data) => {
        this.station.event.illegaldrop.emit(data);
      });
      x.event.illegalvehicle.subscribe((data) => {
        this.station.event.illegalvehicle.emit(data);
      });
      x.event.garbagefull.subscribe((data) => {
        this.station.event.garbagefull.emit(data);
      });
      x.event.garbagedrop.subscribe((data) => {
        this.station.event.garbagedrop.emit(data);
      });
      x.event.error.subscribe((data) => {
        this.station.event.error.emit(data);
      });
    });
  }

  move(center: [number, number]) {
    this.amap.move(center);
  }

  fit(datas?: any) {
    this.amap.fit(datas);
  }

  root = {
    load: async (root: MapDivision, datas: MapDivision[]) => {
      this.amap.root.get().then((x) => {
        x.load(root, datas);
      });
    },
  };
  division = {
    load: (datas: MapDivision[]) => {
      this.amap.division.get().then((x) => {
        x.load(datas);
      });
    },
    select: (id: string) => {
      this.amap.division.get().then((x) => {
        x.select(id);
      });
    },
  };
  station = {
    event: {
      camera: new EventEmitter<GarbageStationViewModel>(),
      mixedinto: new EventEmitter<GarbageStationViewModel>(),
      illegaldrop: new EventEmitter<GarbageStationViewModel>(),
      illegalvehicle: new EventEmitter<GarbageStationViewModel>(),
      garbagefull: new EventEmitter<GarbageStationViewModel>(),
      garbagedrop: new EventEmitter<GarbageStationViewModel>(),
      error: new EventEmitter<GarbageStationViewModel>(),
    },
    load: (datas: GarbageStationViewModel[]) => {
      this.amap.station.get().then((x) => {
        x.clear();
        x.load(datas);
      });
    },
    clear: () => {
      this.amap.station.get().then((x) => {
        x.clear();
      });
    },
    eventable: (types: EventType[]) => {
      this.amap.station.get().then((x) => {
        x.set.eventable(types);
      });
    },
    blur: () => {
      this.amap.station.get().then((x) => {
        x.set.blur();
      });
    },
    select: (id: string) => {
      this.amap.station.get().then((x) => {
        x.select(id);
      });
    },
  };
  device = {
    load: (datas: IasDevice[]) => {
      this.amap.device.get().then((x) => {
        x.clear();
        x.load(datas);
      });
    },
  };
  record = {
    event: {
      dblclick: new EventEmitter<IasEventRecord>(),
    },
    load: (datas: IasEventRecord[]) => {
      this.amap.record.get().then((x) => {
        x.clear();
        x.load(datas);
      });
    },
    clear: () => {
      this.amap.record.get().then((x) => {
        x.clear();
      });
    },
  };
}
