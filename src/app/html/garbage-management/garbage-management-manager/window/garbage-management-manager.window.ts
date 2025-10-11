import { Injectable } from '@angular/core';
import { GarbageManagementManagerPictureWindow } from './garbage-management-manager-picture.window';

import { GarbageManagementManagerBusiness } from '../business/garbage-management-manager.business';
import { GarbageManagementManagerRecordWindow } from './record/garbage-management-manager-record.window';
import { GarbageManagementManagerVideoWindow } from './video/garbage-management-manager-video.window';

@Injectable()
export class GarbageManagementManagerWindow {
  record = new GarbageManagementManagerRecordWindow();
  picture = new GarbageManagementManagerPictureWindow();
  video: GarbageManagementManagerVideoWindow;

  constructor(business: GarbageManagementManagerBusiness) {
    this.video = new GarbageManagementManagerVideoWindow(business);
  }
}
