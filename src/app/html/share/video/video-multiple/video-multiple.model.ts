import { EventEmitter } from '@angular/core';
import { VideoPlaybackArgs, VideoPreviewArgs } from '../component/video.model';

export class VideoArgs {
  image = '';
  preview?: VideoPreviewArgs;
  playback?: VideoPlaybackArgs;
}
export class VideoItem {
  image = '';
  preview = new EventEmitter<VideoPreviewArgs>();
  playback = new EventEmitter<VideoPlaybackArgs>();
}
