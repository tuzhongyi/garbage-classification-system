import { VideoArgs } from '../../../../share/video/video-multiple/video-multiple.model';
import { GarbageManagementManagerBusiness } from '../../business/garbage-management-manager.business';
import { GarbageManagementManagerVideoMultipleWindow } from './garbage-management-manager-video-multiple.window';
import { GarbageManagementManagerVideoSingleMKVWindow } from './garbage-management-manager-video-single-mkv.window';
import { GarbageManagementManagerVideoSingleWSWindow } from './garbage-management-manager-video-single-ws.window';

export class GarbageManagementManagerVideoWindow {
  multiple: GarbageManagementManagerVideoMultipleWindow;
  constructor(business: GarbageManagementManagerBusiness) {
    this.multiple = new GarbageManagementManagerVideoMultipleWindow(
      business,
      this.open.bind(this)
    );
  }
  mkv = new GarbageManagementManagerVideoSingleMKVWindow();
  ws = new GarbageManagementManagerVideoSingleWSWindow();

  open(title: string, args: VideoArgs, type: VideoType) {
    switch (type) {
      case VideoType.ws:
        this.ws.open(title, args);
        break;
      case VideoType.mkv:
        // this.mkv.open(title, args);
        break;
    }
  }
}
export enum VideoType {
  ws,
  mkv,
}
