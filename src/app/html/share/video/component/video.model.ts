import { Duration } from '../../../../common/network/model/garbage-station/duration.model';

export interface VideoPreviewArgs {
  cameraId: string;
  stream: number;
}
export interface VideoPlaybackArgs {
  cameraId: string;
  stream: number;
  duration?: Duration;
}
