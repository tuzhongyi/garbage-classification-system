import { EventEmitter } from '@angular/core';
import { CameraPictureUrl } from '../../../../../common/network/model/url-model/camera-picture-url.model';
import {
  VideoPlaybackArgs,
  VideoPreviewArgs,
} from '../../../../share/video/component/video.model';
import { GarbageManagementManagerComponent } from '../../garbage-management-manager.component';

export class GarbageManagementManagerMediumController {
  constructor(private that: GarbageManagementManagerComponent) {}

  private get window() {
    return this.that.window;
  }
  private get business() {
    return this.that.business;
  }

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

  capture = {
    doing: false,
    do: (stationId: string) => {
      this.capture.doing = true;
      return new Promise<CameraPictureUrl[]>((resolve) => {
        if (stationId) {
          this.business.station
            .capture(stationId)
            .then((pictures) => {
              resolve(pictures);
            })
            .catch((e) => {
              resolve([]);
            })
            .finally(() => {
              this.capture.doing = false;
            });
        }
      });
    },
  };
}
