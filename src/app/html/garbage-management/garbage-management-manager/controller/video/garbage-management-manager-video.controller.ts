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
    if (this.window.video.single.show) {
      if (this.window.video.single.args.playback) {
        this.playback.emit(this.window.video.single.args.playback);
      } else if (this.window.video.single.args.preview) {
        this.preview.emit(this.window.video.single.args.preview);
      } else {
        this.window.video.single.show = false;
      }
    }
  }
}
