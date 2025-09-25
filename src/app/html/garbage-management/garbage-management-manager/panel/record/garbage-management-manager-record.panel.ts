import { GarbageManagementManagerWindow } from '../../window/garbage-management-manager.window';
import { GarbageManagementManagerRecordGarbageDropPanel } from './garbage-management-manager-record-garbage-drop.panel';
import { GarbageManagementManagerRecordGarbageFullPanel } from './garbage-management-manager-record-garbage-full.panel';
import { GarbageManagementManagerRecordIasPanel } from './garbage-management-manager-record-ias.panel';
import { GarbageManagementManagerRecordIllegalDropPanel } from './garbage-management-manager-record-illegal-drop.panel';
import { GarbageManagementManagerRecordMixedIntoPanel } from './garbage-management-manager-record-mixed-into.panel';

export class GarbageManagementManagerRecordPanel {
  ias: GarbageManagementManagerRecordIasPanel;
  garbagefull: GarbageManagementManagerRecordGarbageFullPanel;
  garbagedrop: GarbageManagementManagerRecordGarbageDropPanel;
  mixedinto: GarbageManagementManagerRecordMixedIntoPanel;
  illegaldrop: GarbageManagementManagerRecordIllegalDropPanel;
  constructor(window: GarbageManagementManagerWindow) {
    this.ias = new GarbageManagementManagerRecordIasPanel(window);
    this.mixedinto = new GarbageManagementManagerRecordMixedIntoPanel(window);
    this.garbagefull = new GarbageManagementManagerRecordGarbageFullPanel(
      window
    );
    this.garbagedrop = new GarbageManagementManagerRecordGarbageDropPanel(
      window
    );
    this.illegaldrop = new GarbageManagementManagerRecordIllegalDropPanel(
      window
    );
  }
}
