import { GarbageManagementManagerWindow } from '../garbage-management-manager.window';
import { GarbageManagementManagerTaskCompleteWindow } from './garbage-management-manager-task-complete.window';
import { GarbageManagementManagerTaskIasWindow } from './garbage-management-manager-task-ias.window';
import { GarbageManagementManagerTaskIllegalVehicleWindow } from './garbage-management-manager-task-illegal-vehicle.window';

export class GarbageManagementManagerTaskWindow {
  ias = new GarbageManagementManagerTaskIasWindow();
  complete = new GarbageManagementManagerTaskCompleteWindow();
  illegalvehicle: GarbageManagementManagerTaskIllegalVehicleWindow;
  constructor(windwo: GarbageManagementManagerWindow) {
    this.illegalvehicle = new GarbageManagementManagerTaskIllegalVehicleWindow(
      windwo
    );
  }
}
