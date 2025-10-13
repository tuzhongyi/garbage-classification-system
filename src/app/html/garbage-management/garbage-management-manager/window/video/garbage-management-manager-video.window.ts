import { Injectable } from '@angular/core';
import { VideoArgs } from '../../../../share/video/video-multiple/video-multiple.model';
import { GarbageManagementManagerVideoMultipleWindow } from './garbage-management-manager-video-multiple.window';
import { GarbageManagementManagerVideoSingleMKVWindow } from './garbage-management-manager-video-single-mkv.window';
import { GarbageManagementManagerVideoSingleWSWindow } from './garbage-management-manager-video-single-ws.window';

@Injectable()
export class GarbageManagementManagerVideoWindow {
  constructor(
    public multiple: GarbageManagementManagerVideoMultipleWindow,
    public mkv: GarbageManagementManagerVideoSingleMKVWindow,
    public ws: GarbageManagementManagerVideoSingleWSWindow
  ) {
    this.regist();
  }

  private regist() {
    this.multiple.play.subscribe((x) => {
      this.open(x.title, x.args, x.type);
    });
  }

  private open(title: string, args: VideoArgs, type: VideoType) {
    switch (type) {
      case VideoType.ws:
        this.ws.open(title, args);
        break;
      case VideoType.mkv:
        this.mkv.open(title, args);
        break;
    }
  }
}
export enum VideoType {
  ws,
  mkv,
}
export const GarbageManagementManagerVideoWindowProvider = [
  GarbageManagementManagerVideoMultipleWindow,
  GarbageManagementManagerVideoSingleMKVWindow,
  GarbageManagementManagerVideoSingleWSWindow,
  GarbageManagementManagerVideoWindow,
];
