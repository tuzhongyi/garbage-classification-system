import { EventEmitter, Injectable } from '@angular/core';
import {
  VideoPlaybackArgs,
  VideoPreviewArgs,
} from '../../../../share/video/component/video.model';
import { GarbageManagementManagerWindow } from '../../window/garbage-management-manager.window';

@Injectable()
export class GarbageManagementManagerVideoController {
  constructor(private window: GarbageManagementManagerWindow) {}
  preview = new EventEmitter<VideoPreviewArgs>();
  playback = new EventEmitter<VideoPlaybackArgs>();

  play() {
    if (this.window.video.ws.show) {
      if (this.window.video.ws.args.playback) {
        this.playback.emit(this.window.video.ws.args.playback);
      } else if (this.window.video.ws.args.preview) {
        this.preview.emit(this.window.video.ws.args.preview);
      } else {
        this.window.video.ws.show = false;
      }
    }
  }
}
