import { EventEmitter } from '@angular/core';
import { GarbageStationViewModel } from '../../../../../../common/view-model/garbage-station.view-model';

export interface GarbageManagementMapAMapInfo {
  Name: string;
  Location?: [number, number];
}
export interface GarbageManagementMapAMapInfoEvent {
  camera: EventEmitter<GarbageStationViewModel>;
  mixedinto: EventEmitter<GarbageStationViewModel>;
  illegaldrop: EventEmitter<GarbageStationViewModel>;
  illegalvehicle: EventEmitter<GarbageStationViewModel>;
  garbagefull: EventEmitter<GarbageStationViewModel>;
  garbagedrop: EventEmitter<GarbageStationViewModel>;
  error: EventEmitter<GarbageStationViewModel>;
}
