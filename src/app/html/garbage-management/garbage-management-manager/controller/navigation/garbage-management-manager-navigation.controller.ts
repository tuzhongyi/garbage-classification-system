import { EventEmitter } from '@angular/core';
import { GarbageManagementManagerIndex } from '../../garbage-management-manager.model';

export class GarbageManagementManagerNavigationController {
  change = new EventEmitter<GarbageManagementManagerIndex>();
  constructor() {}

  index = GarbageManagementManagerIndex.home;

  home() {
    if (this.index === GarbageManagementManagerIndex.home) return;
    this.index = GarbageManagementManagerIndex.home;

    this.change.emit(this.index);
  }
  street() {
    if (this.index === GarbageManagementManagerIndex.street) return;
    this.index = GarbageManagementManagerIndex.street;
    this.change.emit(this.index);
  }
  vehicle() {
    if (this.index === GarbageManagementManagerIndex.vehicle) return;
    this.index = GarbageManagementManagerIndex.vehicle;
    this.change.emit(this.index);
  }
  garbagedrop() {
    if (this.index === GarbageManagementManagerIndex.illegaldump) return;
    this.index = GarbageManagementManagerIndex.illegaldump;
    this.change.emit(this.index);
  }
  garbagestation() {
    if (this.index === GarbageManagementManagerIndex.garbagestation) return;
    this.index = GarbageManagementManagerIndex.garbagestation;
    this.change.emit(this.index);
  }
}
