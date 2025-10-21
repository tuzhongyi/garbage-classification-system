import { GarbageManagementManagerBusiness } from '../../business/garbage-management-manager.business';
import { GarbageManagementManagerWindow } from '../../window/garbage-management-manager.window';
import { GarbageManagementManagerStationPanel } from '../garbage-management-manager-station.panel';
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
  constructor(
    window: GarbageManagementManagerWindow,
    business: GarbageManagementManagerBusiness,
    station: GarbageManagementManagerStationPanel
  ) {
    this.ias = new GarbageManagementManagerRecordIasPanel(window);
    this.mixedinto = new GarbageManagementManagerRecordMixedIntoPanel(
      window,
      business
    );
    this.garbagefull = new GarbageManagementManagerRecordGarbageFullPanel(
      window,
      station
    );
    this.garbagedrop = new GarbageManagementManagerRecordGarbageDropPanel(
      window,
      business
    );
    this.illegaldrop = new GarbageManagementManagerRecordIllegalDropPanel(
      window
    );
    this.illegaldump = new GarbageManagementManagerRecordIllegalDumpPanel(
      window
    );
    this.illegalvehicle = new GarbageManagementManagerRecordIllegalVehiclePanel(
      window
    );
  }
}
