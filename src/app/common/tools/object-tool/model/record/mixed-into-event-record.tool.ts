import { VideoArgs } from '../../../../../html/share/video/video-multiple/video-multiple.model';
import { MixedIntoEventRecord } from '../../../../network/model/garbage-station/event-record/mixed-into-event-record.model';
import { CameraImageUrl } from '../../../../network/model/url-model/camera-image-url.model';
import { CameraTool } from '../camera/camera.tool';
import { IRecordTool } from './record-tool.interface';

export class MixedIntoEventRecordTool
  implements IRecordTool<MixedIntoEventRecord>
{
  constructor(private camera: CameraTool) {}

  cameras(data: MixedIntoEventRecord) {
    let cameras: CameraImageUrl[] = [];

    let trigger = new CameraImageUrl();
    trigger.CameraId = data.ResourceId ?? '';
    trigger.CameraName = data.ResourceName;
    trigger.ImageUrl = data.ImageUrl ?? '';
    trigger.Objects = data.Data.Objects;
    trigger.Rules = data.Data.Rules;

    cameras.push(trigger);

    if (data.Data.HandleImageUrl) {
      let handle = new CameraImageUrl();
      handle.CameraId = data.ResourceId ?? '';
      handle.CameraName = data.ResourceName;
      handle.ImageUrl = data.Data.HandleImageUrl ?? '';
      handle.Objects = data.Data.Objects;
      handle.Rules = data.Data.Rules;
      cameras.push(handle);
    }

    return cameras;
  }

  images(data: MixedIntoEventRecord): string[] {
    let cameras = this.cameras(data);
    let images: string[] = [];
    for (let i = 0; i < cameras.length; i++) {
      images.push(cameras[i].ImageUrl);
    }
    return images;
  }
  videos(data: MixedIntoEventRecord): VideoArgs[] {
    let cameras = this.cameras(data);
    let videos: VideoArgs[] = [];

    if (cameras.length > 0) {
      let item = this.camera.image.video.playback(cameras[0], data.EventTime);
      videos.push(item);
    }

    if (cameras.length > 1 && data.Data.HandleTime) {
      let item = this.camera.image.video.playback(
        cameras[1],
        data.Data.HandleTime
      );
      videos.push(item);
    }
    return videos;
  }
}
