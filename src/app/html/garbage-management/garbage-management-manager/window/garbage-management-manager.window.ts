import { Injectable } from '@angular/core';
import { GarbageManagementManagerPictureWindow } from './garbage-management-manager-picture.window';

import { GarbageManagementManagerRecordWindow } from './record/garbage-management-manager-record.window';
import { GarbageManagementManagerVideoWindow } from './video/garbage-management-manager-video.window';

@Injectable()
export class GarbageManagementManagerWindow {
  record = new GarbageManagementManagerRecordWindow();
  picture = new GarbageManagementManagerPictureWindow();
  video = new GarbageManagementManagerVideoWindow();
}
