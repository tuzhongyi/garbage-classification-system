import { GarbageManagementManagerRecordCompleteWindow } from './garbage-management-manager-record-complete.window';
import { GarbageManagementManagerRecordIasWindow } from './garbage-management-manager-record-ias.window';

export class GarbageManagementManagerRecordWindow {
  ias = new GarbageManagementManagerRecordIasWindow();
  complete = new GarbageManagementManagerRecordCompleteWindow();
}
