import { VideoArgs } from '../../../../../html/share/video/video-multiple/video-multiple.model';
import { GarbageFullEventRecord } from '../../../../network/model/garbage-station/event-record/garbage-full-event-record.model';
import { CameraImageUrl } from '../../../../network/model/url-model/camera-image-url.model';
import { CameraTool } from '../camera/camera.tool';
import { IRecordTool } from './record-tool.interface';

export class GarbageFullEventRecordTool
  implements IRecordTool<GarbageFullEventRecord>
{
  constructor(private camera: CameraTool) {}

  cameras(data: GarbageFullEventRecord) {
    let cameras: CameraImageUrl[] = [];
    if (data.Data.CameraImageUrls) {
      cameras.push(...data.Data.CameraImageUrls);
    }
    if (data.Data.HandleImageUrls) {
      cameras.push(...data.Data.HandleImageUrls);
    }
    return cameras;
  }

  videos(data: GarbageFullEventRecord) {
    let videos: VideoArgs[] = [];

    if (data.Data.CameraImageUrls) {
      videos.push(
        ...data.Data.CameraImageUrls.map((x) =>
          this.camera.image.video.playback(x, data.EventTime)
        )
      );
    }
    if (data.Data.HandleImageUrls && data.Data.HandleTime) {
      videos.push(
        ...data.Data.HandleImageUrls.map((x) =>
          this.camera.image.video.playback(x, data.Data.HandleTime!)
        )
      );
    }
    return videos;
  }

  images(data: GarbageFullEventRecord) {
    let cameras = this.cameras(data);
    let images: string[] = [];
    for (let i = 0; i < cameras.length; i++) {
      images.push(cameras[i].ImageUrl);
    }
    return images;
  }
}
