import { Injectable } from '@angular/core';
import { GarbageManagementManagerPictureWindow } from './garbage-management-manager-picture.window';
import { GarbageManagementManagerVideoWindow } from './garbage-management-manager-video.window';
import { GarbageManagementManagerRecordWindow } from './record/garbage-management-manager-record.window';

@Injectable()
export class GarbageManagementManagerWindow {
  record = new GarbageManagementManagerRecordWindow();
  picture = new GarbageManagementManagerPictureWindow();
  video = new GarbageManagementManagerVideoWindow();
}
