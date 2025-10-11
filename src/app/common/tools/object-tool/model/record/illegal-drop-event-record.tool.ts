import { VideoArgs } from '../../../../../html/share/video/video-multiple/video-multiple.model';
import { IllegalDropEventRecord } from '../../../../network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { CameraImageUrl } from '../../../../network/model/url-model/camera-image-url.model';
import { CameraTool } from '../camera/camera.tool';
import { IRecordTool } from './record-tool.interface';

export class IllegalDropEventRecordTool
  implements IRecordTool<IllegalDropEventRecord>
{
  constructor(private camera: CameraTool) {}
  images(data: IllegalDropEventRecord): string[] {
    let cameras = this.cameras(data);
    let images: string[] = [];
    for (let i = 0; i < cameras.length; i++) {
      images.push(cameras[i].ImageUrl);
    }
    return images;
  }
  videos(data: IllegalDropEventRecord): VideoArgs[] {
    let cameras = this.cameras(data);
    let videos: VideoArgs[] = [];
    for (let i = 0; i < cameras.length; i++) {
      let item = this.camera.image.video.playback(cameras[i], data.EventTime);
      videos.push(item);
    }
    return videos;
  }
  cameras(data: IllegalDropEventRecord) {
    let camera = new CameraImageUrl();
    camera.CameraId = data.ResourceId ?? '';
    camera.CameraName = data.ResourceName;
    camera.ImageUrl = data.ImageUrl ?? '';
    camera.Objects = data.Data.Objects;
    camera.Rules = data.Data.Rules;
    return [camera];
  }
}
