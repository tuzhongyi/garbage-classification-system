import { Injectable } from '@angular/core';
import { GarbageManagementManagerWindow } from '../window/garbage-management-manager.window';
import { GarbageManagementManagerSettingsPanel } from './garbage-management-manager-settings.panel';
import { GarbageManagementManagerStationPanel } from './garbage-management-manager-station.panel';
import { GarbageManagementManagerStreetPanel } from './garbage-management-manager-street.panel';
import { GarbageManagementManagerRecordPanel } from './record/garbage-management-manager-record.panel';

@Injectable()
export class GarbageManagementManagerPanel {
  settings = new GarbageManagementManagerSettingsPanel();
  station = new GarbageManagementManagerStationPanel();
  street = new GarbageManagementManagerStreetPanel();
  record: GarbageManagementManagerRecordPanel;
  constructor(window: GarbageManagementManagerWindow) {
    this.record = new GarbageManagementManagerRecordPanel(window);
  }
}
