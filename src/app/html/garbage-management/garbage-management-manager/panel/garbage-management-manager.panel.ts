import { GarbageManagementManagerComponent } from '../garbage-management-manager.component';
import { GarbageManagementManagerSettingsPanel } from './garbage-management-manager-settings.panel';
import { GarbageManagementManagerStationPanel } from './garbage-management-manager-station.panel';
import { GarbageManagementManagerStreetPanel } from './garbage-management-manager-street.panel';
import { GarbageManagementManagerRecordPanel } from './record/garbage-management-manager-record.panel';

export class GarbageManagementManagerPanel {
  settings = new GarbageManagementManagerSettingsPanel();
  street = new GarbageManagementManagerStreetPanel();

  station: GarbageManagementManagerStationPanel;
  record: GarbageManagementManagerRecordPanel;

  constructor(that: GarbageManagementManagerComponent) {
    this.station = new GarbageManagementManagerStationPanel(that);
    this.record = new GarbageManagementManagerRecordPanel(that);
  }
}
