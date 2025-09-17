import { Injectable } from '@angular/core';
import { GarbageManagementManagerSettingsWindow } from './garbage-management-manager-settings.window';
import { GarbageManagementManagerStationWindow } from './garbage-management-manager-station.window';
import { GarbageManagementManagerStreetWindow } from './garbage-management-manager-street.window';

@Injectable()
export class GarbageManagementManagerWindow {
  settings = new GarbageManagementManagerSettingsWindow();
  station = new GarbageManagementManagerStationWindow();
  street = new GarbageManagementManagerStreetWindow();
}
