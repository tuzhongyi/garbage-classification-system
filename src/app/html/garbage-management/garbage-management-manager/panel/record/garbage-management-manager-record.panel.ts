import { GarbageManagementManagerWindow } from '../../window/garbage-management-manager.window';
import { GarbageManagementManagerRecordIasPanel } from './garbage-management-manager-record-ias.panel';

export class GarbageManagementManagerRecordPanel {
  ias: GarbageManagementManagerRecordIasPanel;

  constructor(window: GarbageManagementManagerWindow) {
    this.ias = new GarbageManagementManagerRecordIasPanel(window);
  }
}
