import { Injectable } from '@angular/core';
import { SRServerRequestService } from '../../../../common/network/request/ai-sr-server/sr-server.service';
import { VideoPlaybackArgs, VideoPreviewArgs } from './video.model';

@Injectable()
export class VideoBusiness {
  constructor(private service: SRServerRequestService) {}

  preview(args: VideoPreviewArgs) {
    return this.service.preview(args.cameraId, args.stream);
  }
  playback(args: VideoPlaybackArgs) {
    if (!args.duration) throw new Error('Duration is required for playback');
    return this.service.playback(args.cameraId, args.duration, args.stream);
  }
}
