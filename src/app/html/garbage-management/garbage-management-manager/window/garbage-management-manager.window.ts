import { Injectable } from '@angular/core';
import { GarbageManagementManagerPictureWindow } from './garbage-management-manager-picture.window';

import { GarbageManagementManagerIasAssociationWindow } from './garbage-management-manager-ias-association.window';
import { GarbageManagementManagerMapWindow } from './garbage-management-manager-map.window';
import { GarbageManagementManagerTaskWindow } from './record/garbage-management-manager-task.window';
import {
  GarbageManagementManagerVideoWindow,
  GarbageManagementManagerVideoWindowProvider,
} from './video/garbage-management-manager-video.window';

@Injectable()
export class GarbageManagementManagerWindow {
  task: GarbageManagementManagerTaskWindow;
  picture = new GarbageManagementManagerPictureWindow();
  map = new GarbageManagementManagerMapWindow();
  association = new GarbageManagementManagerIasAssociationWindow();

  constructor(public video: GarbageManagementManagerVideoWindow) {
    this.task = new GarbageManagementManagerTaskWindow(this);
  }

  get opened() {
    return this.association.show;
  }
}

export const GarbageManagementManagerWindowProvider = [
  ...GarbageManagementManagerVideoWindowProvider,
  GarbageManagementManagerWindow,
];
