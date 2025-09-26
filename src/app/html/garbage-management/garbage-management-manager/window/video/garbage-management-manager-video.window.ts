import { GarbageManagementManagerVideoMultipleWindow } from './garbage-management-manager-video-multiple.window';
import { GarbageManagementManagerVideoSingleWindow } from './garbage-management-manager-video-single.window';

export class GarbageManagementManagerVideoWindow {
  single = new GarbageManagementManagerVideoSingleWindow();
  multiple = new GarbageManagementManagerVideoMultipleWindow();
}
