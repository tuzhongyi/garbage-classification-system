import { ICamera } from '../garbage-station/camera.interface';

export class VideoListArgs<T extends ICamera = any> {
  cameras: T[] = [];
  title: string = '';
  mode: PlayMode = PlayMode.live;
  autoplay: boolean = false;
  time?: Date;
}
export enum PlayMode {
  live = 'live',
  vod = 'vod',
}
