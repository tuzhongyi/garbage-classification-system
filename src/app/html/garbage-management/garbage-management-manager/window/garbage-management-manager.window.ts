import { Injectable } from '@angular/core';
import { GarbageManagementManagerRecordWindow } from './record/garbage-management-manager-record.window';

@Injectable()
export class GarbageManagementManagerWindow {
  record = new GarbageManagementManagerRecordWindow();
}
