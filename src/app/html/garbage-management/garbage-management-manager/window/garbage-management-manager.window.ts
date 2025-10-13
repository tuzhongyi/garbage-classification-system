import { Injectable } from '@angular/core';
import { GarbageManagementManagerPictureWindow } from './garbage-management-manager-picture.window';

import { GarbageManagementManagerTaskWindow } from './record/garbage-management-manager-task.window';
import {
  GarbageManagementManagerVideoWindow,
  GarbageManagementManagerVideoWindowProvider,
} from './video/garbage-management-manager-video.window';

@Injectable()
export class GarbageManagementManagerWindow {
  task: GarbageManagementManagerTaskWindow;
  picture = new GarbageManagementManagerPictureWindow();

  constructor(public video: GarbageManagementManagerVideoWindow) {
    this.task = new GarbageManagementManagerTaskWindow(this);
  }
}

export const GarbageManagementManagerWindowProvider = [
  ...GarbageManagementManagerVideoWindowProvider,
  GarbageManagementManagerWindow,
];
