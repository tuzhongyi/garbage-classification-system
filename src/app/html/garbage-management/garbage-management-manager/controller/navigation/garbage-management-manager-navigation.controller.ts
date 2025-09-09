import { EventEmitter } from '@angular/core';
import { GarbageManagementManagerIndex } from '../../garbage-management-manager.model';

export class GarbageManagementManagerNavigationController {
  change = new EventEmitter<GarbageManagementManagerIndex>();
  constructor() {}

  index = GarbageManagementManagerIndex.home;

  home() {
    this.index = GarbageManagementManagerIndex.home;

    this.change.emit(this.index);
  }
  street() {
    this.index = GarbageManagementManagerIndex.street;
    this.change.emit(this.index);
  }
  vehicle() {
    this.index = GarbageManagementManagerIndex.vehicle;
    this.change.emit(this.index);
  }
  garbagedrop() {
    this.index = GarbageManagementManagerIndex.garbagedrop;
    this.change.emit(this.index);
  }
  mixedinto() {
    this.index = GarbageManagementManagerIndex.mixedinto;
    this.change.emit(this.index);
  }
}
