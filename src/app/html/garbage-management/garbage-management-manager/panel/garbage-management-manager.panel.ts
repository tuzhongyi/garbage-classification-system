import { Injectable } from '@angular/core';
import { GarbageManagementManagerBusiness } from '../business/garbage-management-manager.business';
import { GarbageManagementManagerWindow } from '../window/garbage-management-manager.window';
import { GarbageManagementManagerSettingsPanel } from './garbage-management-manager-settings.panel';
import { GarbageManagementManagerStationPanel } from './garbage-management-manager-station.panel';
import { GarbageManagementManagerStreetPanel } from './garbage-management-manager-street.panel';
import { GarbageManagementManagerRecordPanel } from './record/garbage-management-manager-record.panel';

@Injectable()
export class GarbageManagementManagerPanel {
  settings = new GarbageManagementManagerSettingsPanel();
  street = new GarbageManagementManagerStreetPanel();

  station: GarbageManagementManagerStationPanel;
  record: GarbageManagementManagerRecordPanel;
  constructor(
    window: GarbageManagementManagerWindow,
    business: GarbageManagementManagerBusiness
  ) {
    this.station = new GarbageManagementManagerStationPanel(window, business);
    this.record = new GarbageManagementManagerRecordPanel(window, business);
  }
}
