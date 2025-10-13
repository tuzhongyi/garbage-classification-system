import { Duration } from '../../../../common/network/model/garbage-station/duration.model';

export interface VideoPreviewArgs {
  cameraId: string;
  cameraName?: string;
  stream: number;
}
export interface VideoPlaybackArgs {
  cameraId: string;
  cameraName?: string;
  stream: number;
  duration?: Duration;
}
