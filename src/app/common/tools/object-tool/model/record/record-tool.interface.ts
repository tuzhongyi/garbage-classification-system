import { VideoArgs } from '../../../../../html/share/video/video-multiple/video-multiple.model';
import { CameraImageUrl } from '../../../../network/model/url-model/camera-image-url.model';

export interface IRecordTool<T> {
  images(data: T): string[];
  cameras(data: T): CameraImageUrl[];
  videos(data: T): VideoArgs[];
}
