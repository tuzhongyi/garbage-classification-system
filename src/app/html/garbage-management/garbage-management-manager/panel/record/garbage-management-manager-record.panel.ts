import { GarbageManagementManagerComponent } from '../../garbage-management-manager.component';
import { GarbageManagementManagerRecordGarbageDropPanel } from './garbage-management-manager-record-garbage-drop.panel';
import { GarbageManagementManagerRecordGarbageFullPanel } from './garbage-management-manager-record-garbage-full.panel';
import { GarbageManagementManagerRecordIasPanel } from './garbage-management-manager-record-ias.panel';
import { GarbageManagementManagerRecordIllegalDropPanel } from './garbage-management-manager-record-illegal-drop.panel';
import { GarbageManagementManagerRecordIllegalDumpPanel } from './garbage-management-manager-record-illegal-dump.panel';
import { GarbageManagementManagerRecordIllegalVehiclePanel } from './garbage-management-manager-record-illegal-vehicle.panel';
import { GarbageManagementManagerRecordMixedIntoPanel } from './garbage-management-manager-record-mixed-into.panel';

export class GarbageManagementManagerRecordPanel {
  ias: GarbageManagementManagerRecordIasPanel;
  garbagefull: GarbageManagementManagerRecordGarbageFullPanel;
  garbagedrop: GarbageManagementManagerRecordGarbageDropPanel;
  mixedinto: GarbageManagementManagerRecordMixedIntoPanel;
  illegaldrop: GarbageManagementManagerRecordIllegalDropPanel;
  illegaldump: GarbageManagementManagerRecordIllegalDumpPanel;
  illegalvehicle: GarbageManagementManagerRecordIllegalVehiclePanel;
  constructor(that: GarbageManagementManagerComponent) {
    this.ias = new GarbageManagementManagerRecordIasPanel(that);
    this.mixedinto = new GarbageManagementManagerRecordMixedIntoPanel(that);
    this.garbagefull = new GarbageManagementManagerRecordGarbageFullPanel(that);
    this.garbagedrop = new GarbageManagementManagerRecordGarbageDropPanel(that);
    this.illegaldrop = new GarbageManagementManagerRecordIllegalDropPanel(that);
    this.illegaldump = new GarbageManagementManagerRecordIllegalDumpPanel(that);
    this.illegalvehicle = new GarbageManagementManagerRecordIllegalVehiclePanel(
      that
    );
  }
}
